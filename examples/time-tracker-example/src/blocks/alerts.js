import Immutable from 'seamless-immutable';
import {mount} from 'redux-blocks';

const INITIAL_STATE = Immutable({
    errors:{}
});
const types = {
    CLEAR_ALERT:"CLEAR_ALERT"
};
const actions = {
    clearAlert: identifier=>({
        type:types.CLEAR_ALERT,
        identifier
    })
};
const selectors = {
    getAlert: (state,identifier) => state.errors[identifier]
};


function reducer(state=INITIAL_STATE,action){
    if (/ERROR$/.test(action.type)){
        return state.setIn(["errors",action.type],action);
    }
    switch (action.type){
        case types.CLEAR_ALERT:
            return state.set("errors",state.errors.without(action.identifier))
        default:
            return state;
    }
}

const comp = mount('alerts')({
    reducer,actions, selectors, types
});
export default comp;