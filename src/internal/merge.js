
export function combineReducers(reducers){
    return function(state,action){
        return reducers.reduce((state,next)=>next(state,action),state);
    }
}
export default function merge(...modules){
    return {
        reducer: combineReducers(modules.map(m=>m.reducer).filter(r=>r)),
        actions: Object.assign.apply(Object,modules.map(m=>m.actions || {})),
        selectors: Object.assign.apply(Object,modules.map(m=>m.selectors || {})),
        types:Object.assign.apply(Object,modules.map(m=>m.types || {}))
    }
}