import React,{Component} from 'react';
import {connect} from 'react-redux';
import Authentication from '../blocks/authentication';
import Alerts from '../blocks/alerts';
import {CustomForm, CustomInput} from '../components/forms';
import {Link} from 'react-router-dom';
import ErrorBar from '../components/errorBar';
import Loader from '../components/loader';

class LoginScene extends Component{

    login = (credentials)=>{
        this.props.login(credentials);
    };
    render(){
        const {error,loading} = this.props;
        return (
            <div className="login">
                {loading && <Loader/> }
                <ErrorBar alert={error} />
                <h3> Welcome to "Time tracker" </h3>
                <h4> Please login </h4>
                <CustomForm className="login-form text-left " onSave={this.login}>
                    <CustomInput name="username">Username</CustomInput>
                    <CustomInput type="password" name="password">Password</CustomInput>
                    <button className="btn btn-primary center-block" type="submit">Login</button>
                </CustomForm>
                <br/>
                <p className="text-left"> If you don't have an account, please <Link to="/register">register</Link></p>
            </div>
        )
    }
}


export default connect(state=>({
    error: Alerts.selectors.getAlert(state,Authentication.types.LOGIN_ERROR),
    loading: Authentication.selectors.syncing(state)
}),{
    login:Authentication.actions.login,
})(LoginScene)