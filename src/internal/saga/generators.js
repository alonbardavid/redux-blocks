import {fork} from 'redux-saga/effects';
import {mountPutEffect,mountSelectEffect,mountTakeEffect} from './effects';
import _forOwn from 'lodash/forOwn';

export function mountFunction(effect,name,mod) {
    return function* handleFunction() {
        const res = effect();
        if (res.next) {
            yield handleGenerator(res, name, mod);
        }
        yield effect;
    }
}
export function* mountFork(name,mod,helper){
    var task = helper.fn.apply(helper.context,helper.args);
    yield* handleGenerator(task,name,mod);
}
function flatValues(obj){
    var values = [];
    _forOwn(obj,value=>{
       if (typeof(value) === 'object') {
           values = values.concat(flatValues(value));
       } else {
           values.push(value);
       }
    });
    return values;
}
export function* handleGenerator(gen,name,mod){
    var res = gen.next();
    var args = undefined;
    const selectors = flatValues(mod.selectors || {});
    const types = flatValues(mod.types || {});
    while(!res.done) {
        try {
            var effects = [].concat(res.value);
            var mountedEffects = effects.map(effect => {
                if (effect.TAKE) {
                    return mountTakeEffect(effect, name, types)
                } else if (effect.FORK) {
                    return fork(mountFork, name, mod, effect.FORK);
                } else if (effect.SELECT) {
                    return mountSelectEffect(effect, name, selectors);
                } else if (effect.PUT) {
                    return mountPutEffect(effect, name, types);
                } else if (effect.next) {
                    return handleGenerator(effect, name, mod);
                } else if (typeof(effect) === 'function') {
                    return mountFunction(effect, name, mod);
                } else {
                    return effect;
                }
            });
            args = yield mountedEffects.length ===1?mountedEffects[0]:mountedEffects;
            res = gen.next(args);
        } catch(e){
            res = gen.throw(e);
        }
    }
}