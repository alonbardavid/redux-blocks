import React from 'react';
import ProjectListScene from './project-list';
import ProjectScene from './project';
import AuthOnly from '../../components/auth-only';
import {Switch, Route} from 'react-router';

function MainScene(){
    return <Switch>
        <Route path="/project/:projectId" component={ProjectScene} />
        <Route component={ProjectListScene} />
    </Switch>
}

export default AuthOnly(MainScene);