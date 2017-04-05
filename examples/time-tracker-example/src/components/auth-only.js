import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navigation from '../blocks/navigation';
import Authentication from '../blocks/authentication';

class RedirectIfNotLoggedIn extends Component {

    componentWillMount(){
        if (!this.props.isLoggedIn) {
            this.props.replace("/login");
        }
    }
    render(){
        //eslint-disable-next-line
        const {isLoggedIn, Wrapped,replace,...rest} = this.props;
        return isLoggedIn?<Wrapped {...rest}></Wrapped> : null
    }
}

const ConnectedRedirect = connect(state=>({
    isLoggedIn: Authentication.selectors.loggedIn(state)
}),{
    replace:Navigation.actions.replace
})(RedirectIfNotLoggedIn);

export default function AuthOnly(Wrapped){
    return function(props) {
        return <ConnectedRedirect Wrapped={Wrapped} {...props}/>
    }
}
