import Crud,{buildHashFromParams} from '../common/crud';
import Auth from './authentication';

import {call,put,takeEvery, takeLatest, select} from 'redux-saga/effects';
import {getTasks,addTask} from '../core/api';
import {merge,mount} from 'redux-blocks/lib/saga';
import Immutable from 'seamless-immutable';


function reducer(state,action){
    if (action.type === Crud.types.CREATE_SUCCESS) {
        const {entity} = action;
        const hash = buildHashFromParams({projectId:entity.project});
        return Immutable.merge(state,{
            lists:{
                [hash]: (state.lists[hash] ||[]).concat(entity.id)
            }
        },{deep:true})
    }
    return state;
}
function* onCreateRequested({entity}){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(addTask, auth, entity);
    yield put(Crud.actions.createSuccess(res));
}
function* onListRequested({params}){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(getTasks, auth, params.projectId);
    yield put(Crud.actions.listSuccess(res,params));
}

function* saga(){
    yield [
        takeEvery(Crud.types.CREATE_REQUESTED,onCreateRequested),
        takeLatest(Crud.types.LIST_REQUESTED, onListRequested)
    ]
}

const comp = {saga,  reducer};
export default mount('tasks')(merge(comp,Crud));