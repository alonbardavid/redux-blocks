import React, {Component, PropTypes} from 'react';


export default class CustomSelect extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func,
        beforeChange: PropTypes.func
    };

    render(){
        const {className="",children, name, value, onChange} = this.props;
        return  <select name={name} className={`form-control ${className}`} value={value} onChange={onChange}>
            {children}
        </select>
    }
}