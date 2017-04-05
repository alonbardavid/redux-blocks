import _forOwn from 'lodash/forOwn';

export function mountReducer(name, reducer){
    const uppercase = name.toUpperCase() + "_";
    return function mountedReducer(state,action){
        if (action.type.indexOf(uppercase)===0){
            return {
                ...state,
                [name]:reducer(state && state[name],{...action,type:action.type.substring(uppercase.length)})
            }
        } else {
            return {
                ...state,
                [name]:reducer(state && state[name],action)
            }
        }
    }
}
export function mountAction (name,action, types){
    return function mountedAction(...args){
        var res = action.apply(null,args);
        if (types[res.type]){
            res.type=name.toUpperCase() + "_" + res.type;
        }
        return res;
    }
}
export function mountActions(name,actions, types = {}){
    var res= {};
    _forOwn(actions,(value,key)=>{
        if (typeof(value) === 'function') {
            res[key] = mountAction(name, value,types)
        } else {
            res[key] = mountActions(name,value, types)
        }
    });
    return res;
}
export function mountSelector(name,selector){
    return function(state,...args) {
        return selector.apply(null,[(state || {})[name]].concat(args))
    }
}
export function mountSelectors(name,selectors) {
    var res= {};
    _forOwn(selectors,(value,key)=>{
        if (typeof(value) === 'function') {
            res[key] = mountSelector(name, value)
        } else {
            res[key] = mountSelectors(name,value)
        }
    });
    return res;
}
function mountType(name,type){
    return name.toUpperCase() + "_" + type;
}
export function mountTypes(name,types){
    var res= {};
    _forOwn(types,(value,key)=>{
        if (typeof(value) !== 'object') {
            res[key] = mountType(name, value)
        } else {
            res[key] = mountTypes(name,value)
        }
    });
    return res;
}
export default function mount(name){
    return function mountModule(mod){
        const {reducer,actions,selectors,types,...rest} = mod;
        return {
            reducer: reducer && mountReducer(name, reducer),
            actions: actions && mountActions(name, actions, types),
            selectors: selectors && mountSelectors(name, selectors),
            types: types && mountTypes(name,types),
            ...rest
        }
    }
}
