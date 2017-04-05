const block1 = {
    types: {
        TYPE1:"TYPE1"
    },
    actions: {
        action1: (payload)=>({
            type:"TYPE1",
            payload
        })
    },
    selectors: {
        select1: (state)=>state.inner1
    },
    reducer: function(state={inner1:""},action){
        if (action.type == 'TYPE1') {
            return {
                ...state,
                inner1:action.payload
            }
        }
        return state;
    }
};

const block2 = {
    types: {
        TYPE2:"TYPE2"
    },
    actions: {
        action2: (payload)=>({
            type:"TYPE2",
            payload
        })
    },
    selectors: {
        select2: (state)=>state.inner2
    },
    reducer: function(state={inner2:""},action){
        if (action.type == 'TYPE2') {
            return {
                ...state,
                inner2:action.payload
            }
        }
        return state;
    }
};

const blockWithExternalType ={
    types: {
        INTERNAL:"INTERNAL"
    },
    actions: {
        external: (payload)=>({
            type:"EXTERNAL",
            payload
        }),
        internal: (payload)=>({
            type:"INTERNAL",
            payload
        })
    },
    selectors: {
        external: (state)=>state.external,
        internal: (state)=>state.internal
    },
    reducer: function(state={internal:"",external:""},action){
        if (action.type == 'INTERNAL') {
            return {
                ...state,
                internal: action.payload
            }
        }
        if (action.type == 'EXTERNAL') {
            return {
                ...state,
                external: action.payload
            }
        }
        return state;
    }
};

export {block1,block2,blockWithExternalType};