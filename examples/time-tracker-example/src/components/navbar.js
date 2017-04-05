import React from 'react';
import {connect} from 'react-redux';
import Navigation from '../blocks/navigation';
import Authentication from '../blocks/authentication';
import './navbar.css';
import {NavLink} from 'react-router-dom';

function Navbar({loggedIn,logout}){
    return (
        <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <a className="navbar-brand">Time tracker</a>
                </div>
                <ul className="nav navbar-nav">
                    {loggedIn? <li><NavLink key='main' to="/">Projects</NavLink></li>:null}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    {loggedIn? <li key="logout"><a  onClick={logout}>Logout</a></li>:null }
                </ul>
        </nav>
    )
}

export default connect(state=>({
    loggedIn:Authentication.selectors.loggedIn(state),
    path:Navigation.selectors.path(state)
}),{
    logout:Authentication.actions.logout
})(Navbar);