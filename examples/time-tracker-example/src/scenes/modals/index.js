import React from 'react';
import {connect} from 'react-redux';
import ModalBlock from '../../blocks/modal';
import './modals.css';
import * as AddTaskModal from './add-task-modal';

const MODALS={
    [AddTaskModal.name]:AddTaskModal.modal
};

function ModalContainer({modal,close}){
    if (modal){
        const Modal = MODALS[modal.name];
        return (
            <div>
                <div className="modal-backdrop" onClick={close}/>
                <div className="modal">
                    <div className="modal-dialog">
                        <Modal close={close} {...modal.props}/>
                    </div>
                </div>
            </div>
        )
    }
    return null;
}

export default connect(state=>({
    modal: ModalBlock.selectors.modal(state)
}),{
    close: ModalBlock.actions.hide
})(ModalContainer)