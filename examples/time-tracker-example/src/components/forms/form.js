import React , {Component,cloneElement} from 'react';
import {clearState} from '../../common/component-utils';
const map = React.Children.map;


class CustomForm extends Component {

    inputs= {};
    constructor(props){
        super();
        this.state = props.initial || {};
    }
    onInputChange = (event)=>{
        const {name,value} = event.currentTarget;
        const inputProps = this.inputs[name].props;
        this.setState({
            [name]:inputProps.beforeChange? inputProps.beforeChange(value): value
        });
    };

    elementCanHandleInput(element){
        return (element.type && element.type.propTypes && element.type.propTypes.onChange) ||
            ['input','select','textarea'].indexOf(element.type) >= 0;
    }
    makeControlledInput(element){
        const name = element.props.name;
        return cloneElement(element,{
            onChange:this.onInputChange,
            value:this.state[name] || "",
            ref: (input)=>{
                this.inputs[name] = input;
            }
        })
    }
    onSubmit = event=>{
        event.preventDefault();
        this.props.onSave(this.state);
        clearState(this);
    };
    bindElement = (element)=>{
        if (this.elementCanHandleInput(element)){
            return this.makeControlledInput(element);
        } else {
            return this.bindChildren(element);
        }
    };
    bindChildren = (element) => {
        if (element.props && element.props.children) {
            return cloneElement(element, {
                children: map(element.props.children, this.bindElement)
            });
        }
        return element;
    };
    render(){
        const {name,children,className} = this.props;
        return <form name={name} className={className} onSubmit={this.onSubmit}>
            {map(children, this.bindElement)}
        </form>
    }
}

export default CustomForm;