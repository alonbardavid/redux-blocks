import Immutable from 'seamless-immutable';
import {put} from 'redux-saga/effects';

const INITIAL_STATE = Immutable({
    entities: {},
    adding:null
});
const types = {
    CREATE_REQUESTED:"CREATE_REQUESTED",
    CREATE_SUCCESS:"CREATE_SUCCESS",
    CREATE_ERROR:"CREATE_ERROR"
};
const actions = {
    create: entity=>({
        type:types.CREATE_REQUESTED,
        entity
    }),
    createSuccess: entity=>({
        type:types.CREATE_SUCCESS,
        entity
    }),
    createError: (entity,reason)=>({
        type:types.CREATE_ERROR,
        entity,
        reason
    }),
};
const selectors = {
    adding: state=>state.adding
};

function reducer(state=INITIAL_STATE,action){
    const {entity} = action;
    switch(action.type){
        case types.CREATE_REQUESTED:
            return state.set("adding",entity);
        case types.CREATE_SUCCESS:
            return state.setIn(["entities",entity.id],entity)
                .set("adding",null);
        case types.CREATE_ERROR:
            return state.set(state,"adding",false);
        default:
            return state;
    }
}
export function onCreate(cb){
    return function*(action){
        try {
            const res = yield* cb(action);
            yield put(actions.createSuccess(res));
        } catch(e){
            yield put(actions.createError(action.entity,e.message))
        }
    }
}
const comp = {
    reducer,actions, selectors, types
};
export {INITIAL_STATE};
export default comp;