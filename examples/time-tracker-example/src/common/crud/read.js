import Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable({
    entities: {},
    syncing: {}
});
const types = {
    READ_REQUESTED:"READ_REQUESTED",
    READ_SUCCESS:"READ_SUCCESS",
    READ_ERROR:"READ_ERROR"
};
const actions = {
    read: id=>({
        type:types.READ_REQUESTED,
        id
    }),
    readSuccess: entity=>({
        type:types.READ_SUCCESS,
        entity
    }),
    readError: (id,reason)=>({
        type:types.READ_ERROR,
        id,
        reason
    })
};
const selectors = {
    get: (state,id) => state.entities[id],
    syncing:(state,id)=>state.syncing[id]
};

function reducer(state=INITIAL_STATE,action){
    const {entity} = action;
    switch(action.type){
        case types.READ_REQUESTED:
            return state.setIn(["syncing",action.id],true);
        case types.READ_SUCCESS:
            return state.setIn(["entities",entity.id],entity)
                .setIn(["syncing",entity.id],false);
        case types.READ_ERROR:
            return state.setIn(["syncing",action.id],true);
        default:
            return state;
    }
}

const comp = {
    reducer,actions, selectors, types
};
export {INITIAL_STATE};
export default comp;