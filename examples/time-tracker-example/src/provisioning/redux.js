import {createStore,applyMiddleware,compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import CoreModule from '../blocks';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(CoreModule.reducer,undefined,
    composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(CoreModule.saga);

export {store};