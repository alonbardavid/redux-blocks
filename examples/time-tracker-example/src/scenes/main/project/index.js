import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddActivity from './addActivity';
import Loader from '../../../components/loader';
import Projects from '../../../blocks/projects';
import Tasks from '../../../blocks/tasks';
import Activities from '../../../blocks/activities';
import ModalBlock from '../../../blocks/modal';
import ActivityList from './activityList';
import EntitiesBlock from '../../../blocks/entities';
import {name as addTaskModalName} from '../../modals/add-task-modal';


class ProjectScene extends Component {
    constructor(props){
        super(props);
        props.loadProject(props.match.params.projectId);
        props.loadTasks(props.match.params);
        props.loadActivities(props.match.params);
    }

    openAddTask = ()=>{
        this.props.openAddTaskModal(addTaskModalName,{projectId:this.props.project.id});
    };
    render(){
        const {project, loading, tasks, activities} = this.props;
        return (loading || !project)? (
            <Loader />
        ): (
            <div className="project">
                <h2 className="text-center">Project: {project.name}</h2>
                <h3>Add an activity:</h3>
                <AddActivity tasks={tasks} openAddTask={this.openAddTask} />
                <ActivityList activities={activities} />
            </div>
        );
    }
}

export default connect((state,props)=>{
    const params = props.match.params;
    return{
        project: Projects.selectors.get(state,params.projectId),
        tasks: Tasks.selectors.list(state,params),
        activities: EntitiesBlock.selectors.activitiesWithTasks(state,params),
        loading : Projects.selectors.syncing(state,params) ||
            Tasks.selectors.isListLoading(state,params) ||
            Activities.selectors.isListLoading(state,params)
    }
},{
    loadProject: Projects.actions.read,
    loadTasks: Tasks.actions.list,
    loadActivities: Activities.actions.list,
    openAddTaskModal: ModalBlock.actions.show
})(ProjectScene);

