import React,{Component} from 'react';
import {connect} from 'react-redux';
import TaskBlock from '../../blocks/tasks';
import {CustomForm,CustomInput} from '../../components/forms';


class AddTaskModal extends Component {

    onSubmit = (task)=>{
        this.props.addTask({
            ...task,
            project:this.props.projectId
        });
        this.props.close();
    };
    render(){
        return (
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" onClick={this.props.close}><span >&times;</span></button>
                    <h4 className="modal-title" >Modal title</h4>
                </div>
                <div className="modal-body">
                    <CustomForm name="add-task-form" className="text-align" onSave={this.onSubmit}>
                        <CustomInput type="text" name="name" >
                            Task Name
                        </CustomInput>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </CustomForm>
                </div>
            </div>
        )
    }
}

const modal = connect(()=>({}),{
    addTask: TaskBlock.actions.create
})(AddTaskModal);
const name = 'add-task-modal';

export {modal,name};