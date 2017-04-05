import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

import App from './scenes/App';
import {history} from './blocks/navigation';
import {store} from './provisioning';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App></App>
        </Router>
    </Provider>,
    document.getElementById('root')
);