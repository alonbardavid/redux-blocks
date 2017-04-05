export function clearState(component){
    const cleaned = Object.keys(component.state).reduce((obj,key)=>{
        obj[key] = component.props.initial && component.props.initial[key];
        return obj;
    },{});
    component.setState(cleaned);
}
