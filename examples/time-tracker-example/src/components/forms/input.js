import React, {Component, PropTypes} from 'react';


export default class CustomInput extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        beforeChange: PropTypes.func
    };

    render(){
        const {className="",name,type="text",children, value, onChange} = this.props;
        return  <div className={`form-group ${className}`}>
            <label htmlFor={name}>{children}</label>
            <input type={type} className="form-control" name={name} value={value}
                   onChange={onChange}/>
        </div>
    }
}