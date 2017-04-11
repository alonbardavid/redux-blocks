# redux-blocks

> This is a work in progress and is in very early stages of development

`redux-blocks` is a library for isolating and combining redux modules (referred to here on out as blocks).
It makes writing reusable redux code easier and more flexible.

### Installation

`npm install --save redux-blocks`

### Examples and tests

If you know _Redux_ then the simplest way to understand _redux-blocks_ is
to look at the tests for [mount](test/internal/mount.spec.js) and [merge](test/internal/merge.spec.js).

You can also look at the real world example application code [here](examples/time-tracker-example/src/blocks/index.js) .

A more details explanation can be found [here](http://www.alonbd.com/posts/redux_module_composition)

### Usage

```js
    import {merge,mount} from 'redux-blocks';
    import {selectors,actions,types,reducer} from 'your code';
    import MoreReduxCode from 'some more of your code';

    const mounted = mount("point")({
        selectors,
        actions,
        types,
        reducer
    });
    const merge(MoreReduxCode,mounted);

```
### What are redux blocks?
Redux blocks are objects with the following syntax:
```js
    {
        selectors: {},
        actions: {},
        types: {}
        reducer: function(){}
    }
```

A simple example of an api request block looks like this:

```js
    const RequestBlock ={
        types: {
            REQUEST:"REQUEST",
            SUCCESS:"SUCCESS"
        },
        selectors: {
            get: state,id=>state.entities[id]
        },
        actions: {
            request: id=>({
                type: "REQUEST",
                id
            }),
            success: entity=>({
                type:"SUCCESS",
                entity
            })
        },
        reducer: function(state={entities:{}},action){
            switch(action.type){
                case "SUCCESS":
                    return {
                        entities: {
                            ...state.entities,
                            [action.entity.id]:action.entitiy
                        }
                    }
                default:
                    return state;
            }
        }
    }
```
The `redux-blocks` library provides two methods to isolate and combine blocks - `mount` and `merge`.

### Mounting blocks

Calling `mount('point')(block)` will isolate selectors and reducers to a section of
the state under point (I.E. the reducer's `state` will actually be the contents in `state.point`).
Type strings will have a `"POINT"` prefix added to it, and any action that returns a type in types will
have the appropriate type associated with it.

If we take the previous example of a simple request block, the result of mounting
it at `"point"` will look like this:
```js
    const mounted = mount('point')(RequestBlock);
    mounted.types.REQUEST; // "POINT_REQUEST"
    mounted.actions.request(5); // {type:"POINT_REQUEST",id:5}
    mounted.actions.success({id:5,name:"me"}); // {type:"POINT_SUCCESS"...}
    //state now looks like this:
    mounted.reducer(); // {point:{entities:{}}}
    mounted.selectors.get({
        point: {
            entities: {
                5: {id:5, name:"me"}
            }
        }
    }
    //will return {id:5, name:"me"}
```

### Merging blocks

calling `merge(block1,block2)` will merge blocks into a single block whose actions, selectors and types are a
combination of both modules selectors, actions and types.
The merged block's reducer is a new function that calls each reducer in turn (I.E. it composes reducers)


### Working with redux-saga

`redux-blocks` provides support for `redux-saga`. Instead of importing `redux-blocks` import `redux-blocks/saga`.
Once imported, merge will make sure to combine the `saga` property in every block.
Mounting a block with redux-saga makes sure that any `put` action overrides the type with the mounted one and
any `take` action correctly registered for the mounted type.