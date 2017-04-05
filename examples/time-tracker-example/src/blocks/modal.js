import {mount} from 'redux-blocks';

const types = {
    SHOW:"SHOW",
    HIDE:"HIDE"
};
const actions = {
    show: (modal,props)=>({
        type:types.SHOW,
        modal,
        props
    }),
    hide: ()=>({
        type:types.HIDE
    })
};
const selectors = {
  modal:state=>state
};
function reducer(state=null,action) {
    switch(action.type){
        case types.SHOW:
            return {
                name:action.modal,
                props:action.props
            };
        case types.HIDE:
            return null;
        default:
            return state;
    }
}

export default mount("modal")({
    reducer,actions,types,selectors
});