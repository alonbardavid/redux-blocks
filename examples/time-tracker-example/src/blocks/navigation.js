import {mount} from 'redux-blocks/lib/saga';
import {} from 'react-router-redux';
import {fork, takeEvery, put} from 'redux-saga/effects';
import createHistory from 'history/createBrowserHistory'

import {  routerReducer ,push ,replace,
    CALL_HISTORY_METHOD, LOCATION_CHANGE} from 'react-router-redux'

function setLocation(location) {
    return{
        type: LOCATION_CHANGE,
        payload: location
    }
}

const selectors = {
    path: state=>state.location.pathname
};
let resolveNextChange;
function setNextResolve(resolve){
    resolveNextChange = resolve;;
}
const history =createHistory();
function startHistory(){
    history.listen(location=>resolveNextChange(location));
}

function* syncUrlToPath(){
    yield put(setLocation(history.location));
    while (true){
        let location = yield new Promise(setNextResolve);
        yield put(setLocation(location));
    }
}
// eslint-disable-next-line
function* onHistoryActionRequested(action){
    const { payload: { method, args } } = action;
    history[method](...args);
}
function* saga(){
    startHistory();
    yield [
        fork(syncUrlToPath),
        takeEvery(CALL_HISTORY_METHOD,onHistoryActionRequested)
    ]
}
export {history};
export default mount('router')({
    reducer:routerReducer, saga,selectors, actions:{
        push,
        replace
    }
});