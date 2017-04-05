import React,{Component} from 'react';
import {connect} from 'react-redux';
import Authentication from '../blocks/authentication';
import {CustomForm, CustomInput} from '../components/forms';
import {Link} from 'react-router-dom';

class RegisterScene extends Component{
    state = {};

    register = (user)=>{
        this.props.register(user)
    };
    render(){
        return (
            <div className="login text-center">
                <h3> Welcome to "Time tracker" </h3>
                <h4> Fill the following form to register </h4>
                <CustomForm className="register-form text-left" onSave={this.register}>
                    <CustomInput name="username">Username</CustomInput>
                    <CustomInput type="password" name="password">Password</CustomInput>
                    <CustomInput name="name">Name</CustomInput>
                    <button className="btn btn-primary center-block" type="submit">Login</button>
                </CustomForm>
                <br/>
                <p className="text-left"> If you already have an account - <Link to="/login">Log in</Link></p>
            </div>
        )
    }
}


export default connect(null,{
    register:Authentication.actions.register
})(RegisterScene)