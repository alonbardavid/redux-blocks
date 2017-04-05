import Crud,{onCreate} from '../common/crud';
import Auth from './authentication';

import {call,put,takeEvery, takeLatest, select} from 'redux-saga/effects';
import {getMyProjects,addProject, getProject} from '../core/api';
import {merge,mount} from 'redux-blocks/lib/saga';

function* doCreate({entity}){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(addProject, auth, entity);
    return res;
}
function* onListRequested(){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(getMyProjects, auth);
    yield put(Crud.actions.listSuccess(res));
}
function* onReadRequested({id}){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(getProject,auth,id);
    yield put(Crud.actions.readSuccess(res));
}
function* saga(){
    yield [
        takeEvery(Crud.types.CREATE_REQUESTED,onCreate(doCreate)),
        takeLatest(Crud.types.LIST_REQUESTED, onListRequested),
        takeLatest(Crud.types.READ_REQUESTED, onReadRequested)
    ]
}

const comp = {saga};
export default mount('project')(merge(comp,Crud));