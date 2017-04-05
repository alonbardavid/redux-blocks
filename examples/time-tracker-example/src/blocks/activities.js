import Crud,{buildHashFromParams} from '../common/crud';
import Auth from './authentication';

import {call,put,takeEvery, takeLatest, select} from 'redux-saga/effects';
import {getActivities,addActivity} from '../core/api';
import {merge,mount} from 'redux-blocks/lib/saga';
import Immutable from 'seamless-immutable';


function sortActivities(state,listId, newEntity) {
    return [newEntity].concat(Crud.selectors.list(state,listId)).sort((a,b)=>a.startDate<b.startDate);
}
function reducer(state,action){
    if (action.type === Crud.types.CREATE_SUCCESS) {
        const {entity} = action;
        const params = {projectId:entity.project};
        const hash = buildHashFromParams(params);
        return Immutable.merge(state,{
            lists:{
                [hash]: sortActivities(state,params, entity).map(a=>a.id)
            }
        },{deep:true})
    }
    return state;
}
function* onCreateRequested({entity}){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(addActivity, auth, entity);
    yield put(Crud.actions.createSuccess(res));
}
function* onListRequested({params}){
    const auth = yield select(Auth.selectors.user);
    const res = yield call(getActivities, auth, params.projectId);
    yield put(Crud.actions.listSuccess(res,params));
}

function* saga(){
    yield [
        takeEvery(Crud.types.CREATE_REQUESTED,onCreateRequested),
        takeLatest(Crud.types.LIST_REQUESTED, onListRequested)
    ]
}

const comp = {saga,  reducer};
export default mount('activities')(merge(comp,Crud));