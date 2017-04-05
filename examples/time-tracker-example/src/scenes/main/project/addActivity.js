import React, {Component} from 'react';
import {connect} from 'react-redux';
import ActivityBlock from '../../../blocks/activities';
import {CustomForm,CustomInput, CustomSelect} from '../../../components/forms';
import {formatToMonth,formatToRoundedHour} from '../../../common/formatting';

const ADD_NEW_TASK_INDICATOR = "ADD_NEW";

function getInitial(){
    const now = new Date().toISOString();
    return {
        date: formatToMonth(now),
        startTime:formatToRoundedHour(now),
        endTime:formatToRoundedHour(now)
    }
}
class AddActivity extends Component {

    onTaskChange= (taskId)=> {
        if (taskId === ADD_NEW_TASK_INDICATOR){
            this.props.openAddTask();
        } else {
            return taskId;
        }
    };
    addActivity = formData =>{
        const startDate = new Date(`${formData.date}T${formData.startTime}`);
        const endDate = new Date(`${formData.date}T${formData.endTime}`);
        this.props.addActivity({
            startDate,
            endDate,
            task:parseInt(formData.task,10)
        });
    };
    render(){
        const {tasks=[]} = this.props;
        return <CustomForm name="add-activity-form" className="form-inline" onSave={this.addActivity} initial={getInitial()}>
            <CustomInput type="date" name="date" >Date</CustomInput>
            <CustomInput type="time" name="startTime" >Start</CustomInput>
            <CustomInput type="time" name="endTime" >End </CustomInput>
            <CustomSelect name="task" required beforeChange={this.onTaskChange}>
                <option  key="empty" value="">choose task </option>
                {tasks.map(task=><option key={task.id} value={task.id}>
                    {task.name}
                </option>)}
                <option key="new" value={ADD_NEW_TASK_INDICATOR}>Add new task </option>
            </CustomSelect>
            <button className="btn btn-primary" type="submit">Add</button>
        </CustomForm>
    }
}

export default connect(null,{
    addActivity:ActivityBlock.actions.create
})(AddActivity);
