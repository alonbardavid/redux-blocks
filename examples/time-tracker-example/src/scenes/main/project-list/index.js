import React, {Component} from 'react';
import {connect} from 'react-redux';
import Project from '../../../blocks/projects';
import Loader from '../../../components/loader';
import ProjectList from './project-list';

class ProjectListScene extends Component {
    constructor(props){
        super(props);
        this.props.load();
    }

    addProject = (project) =>{
        this.props.addProject(project);
    };
    render(){
        const {projects,loading} = this.props;
        return loading?(
            <Loader />
        ):(
            <ProjectList projects={projects} addProject={this.addProject} />
        )
    }
}

export default connect(state=>({
    projects:Project.selectors.list(state),
    loading: Project.selectors.isListLoading(state)
}),{
    addProject: Project.actions.create,
    load: Project.actions.list
})(ProjectListScene);

