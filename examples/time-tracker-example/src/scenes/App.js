import React, { Component } from 'react';
import Navbar from '../components/navbar';
import Login from './login';
import Register from './register';
import Main from './main';
import {Route, Switch} from 'react-router';
import ModalContainer from './modals';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="app">
                <ModalContainer />
                <Navbar></Navbar>
                <div className="container">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route component={Main} />
                    </Switch>
                </div>

            </div>
        );
    }
}

export default App;