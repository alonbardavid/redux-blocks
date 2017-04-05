import Collection,{buildHashFromParams, INITIAL_STATE as COLLECTION_STATE} from './list';
import Create,{INITIAL_STATE as CREATE_STATE,
    onCreate
} from './create';
import Read,{INITIAL_STATE as READ_STATE} from './read';
import {merge} from 'redux-blocks';
import Immutable from 'seamless-immutable';

const INITIAL_STATE = Immutable.merge(COLLECTION_STATE,READ_STATE,CREATE_STATE);
function reducer(state = INITIAL_STATE,action){
    switch(action.type){
        case Create.types.CREATE_SUCCESS:
            return Immutable.merge(state,{
                lists: {
                    'all':(state.lists.all || []).concat(action.entity.id)
                }
            },{deep:true});
        default:
            return state;
    }
}
const comp = {reducer};
export {INITIAL_STATE,buildHashFromParams,onCreate};
export default merge(comp,Collection,Create,Read);