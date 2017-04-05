import {call,put,takeEvery} from 'redux-saga/effects';
import {register, login} from '../core/api';
import Navigation from './navigation';
import {mount} from 'redux-blocks/lib/saga';

function getUserFromStorage(){
    const raw = localStorage.getItem('user_info');
    return raw?JSON.parse(raw): null;
}
function addUserToStorage(user){
    localStorage.setItem('user_info', JSON.stringify(user));
}
function clearUserFromStorage(){
    localStorage.removeItem('user_info');
}
function getInitialState(){
    const user = getUserFromStorage();
    return {
        syncing:false,
        user
    }
}
const types = {
    LOGIN_REQUESTED:"LOGIN_REQUESTED",
    LOGIN_SUCCESS:"LOGIN_SUCCESS",
    LOGIN_ERROR:"LOGIN_ERROR",
    REGISTER_REQUESTED:"REGISTER_REQUESTED",
    REGISTER_SUCCESS:"REGISTER_SUCCESS",
    REGISTER_ERROR:"REGISTER_ERROR",
    LOGOUT:"LOGOUT"
};
const actions = {
    register: user=>({
        type:types.REGISTER_REQUESTED,
        user
    }),
    registerSuccess: user=>({
        type: types.REGISTER_SUCCESS,
        user
    }),
    login: credentials=>({
        type:types.LOGIN_REQUESTED,
        credentials
    }),
    loginSuccess: user=>({
        type: types.LOGIN_SUCCESS,
        user
    }),
    loginError: reason=>({
        type: types.LOGIN_ERROR,
        reason
    }),
    logout: ()=>({
        type: types.LOGOUT
    })
};
const selectors = {
    loggedIn: state => !!state.user,
    syncing: state=>state.syncing,
    user: state=>state.user
};
function reducer(state=getInitialState(),action){
    switch(action.type){
        case types.LOGIN_REQUESTED:
        case types.REGISTER_REQUESTED:
            return {
                user:state.user,
                syncing:true
            };
        case types.LOGIN_SUCCESS:
            return {
                user:action.user,
                syncing:false
            };
        case types.LOGIN_ERROR:
        case types.REGISTER_ERROR:
            return {
                 syncing:false
            };
        case types.LOGOUT:
            return {
                syncing:false
            };
        default:
            return state;
    }
}
function* performLogin({credentials}){
    try {
        const user = yield call(login, credentials);
        yield put(actions.loginSuccess(user))
    } catch(e){
        yield put (actions.loginError(e.message))
    }
}
function* performRegister(action){
    const user = yield call(register,action.user);
    yield put(actions.registerSuccess(user));
    yield put(actions.loginSuccess(user));
}
function* onLoginSuccess({user}){
    yield call(addUserToStorage,user);
    yield put(Navigation.actions.push("/"));
}
function* onLogout(){
    yield call(clearUserFromStorage);
    yield put(Navigation.actions.push("/login"));
}
function* saga(){
    yield [
        takeEvery(types.LOGIN_REQUESTED,performLogin),
        takeEvery(types.REGISTER_REQUESTED,performRegister),
        takeEvery(types.LOGIN_SUCCESS,onLoginSuccess),
        takeEvery(types.LOGOUT, onLogout)
    ]
}

const comp = mount('auth')({
    saga,reducer,actions, selectors, types
});
export default comp;