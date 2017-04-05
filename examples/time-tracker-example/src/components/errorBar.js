import React, {Component} from 'react';
import {storeShape} from 'react-redux/lib/utils/PropTypes';
import Alerts from '../blocks/alerts';

export default class ErrorBar extends Component {
    static contextTypes = {
        store:storeShape
    };
    removeAlert= ()=>{
        this.context.store.dispatch(Alerts.actions.clearAlert(this.props.alert.type));
    };
    render(){
        const {alert} = this.props;
        return alert? (
            <div className="alert alert-danger" role="alert">
                {alert.reason}
                <button type="button" className="close pull-right"
                        onClick={this.removeAlert} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        ) : null;
    }
}
