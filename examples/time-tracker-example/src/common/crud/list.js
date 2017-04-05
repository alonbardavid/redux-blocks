import Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable({
    entities: {},
    lists: {},
    syncingLists: {}
});
const types = {
    LIST_REQUESTED:"LIST_REQUESTED",
    LIST_SUCCESS:"LIST_SUCCESS"
};
const actions = {
    list: params=>({
        type:types.LIST_REQUESTED,
        params
    }),
    listSuccess: (entities,params)=>({
        type:types.LIST_SUCCESS,
        params,
        entities
    })
};
const selectors = {
    list: (state,params)=>{
        return (state.lists[buildHashFromParams(params)] || []).map(id=>state.entities[id]);
    },
    isListLoading:(state,params)=>{
        return !!state.syncingLists[buildHashFromParams(params)]
    }
};

export function buildHashFromParams(params){
    if (!params){
        return "all";
    }
    if (typeof params === 'object'){
        return Object.keys(params).map(key=>`${key}=${params[key]}`).join("&");
    }
    return params.toString();
}
function buildEntitiesObject(entities){
    const entityDict = entities.reduce((obj,e)=>{
        obj[e.id] = e;
        return obj;
    },{});
    return entityDict;
}
function reducer(state=INITIAL_STATE,action){
    switch(action.type){
        case types.LIST_REQUESTED:
            return state.setIn(["syncingLists",buildHashFromParams(action.params)],true);
        case types.LIST_SUCCESS:
            const {params,entities} = action;
            const hash = buildHashFromParams(params);
            return state.merge({
                entities:buildEntitiesObject(entities),
                lists: {
                  [hash]: entities.map(e=>e.id),
                },
                syncingLists:{
                    [hash]:false
                }
            },{deep:true});
        default:
            return state;
    }
}

const comp = {
    reducer,actions, selectors, types
};
export {INITIAL_STATE};

export default comp;