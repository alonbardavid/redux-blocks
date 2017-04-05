import {handleGenerator} from './generators';
import basicMerge from '../merge';
import basicMount from '../mount';

export function mountSaga(name,saga,mod){
    return function* mountedSaga(){
        const gen = saga();
        yield* handleGenerator(gen,name,mod);
    }
}

export function combineSaga(sagas){
    return function* combinedSaga(){
        yield sagas.map(s=>s());
    }
}

export function mount(name){
    return function mountModuleWithSaga(mod){
        const {saga,...rest} = mod;
        const res = basicMount(name)(rest);
        res.saga = saga && mountSaga(name,saga,mod);
        return res;
    }
}

export function merge(...modules){
    const res = basicMerge(...modules);
    res.saga = combineSaga(modules.map(m=>m.saga).filter(s=>s));
    return res;
}