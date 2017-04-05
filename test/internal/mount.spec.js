import mount from '../../src/internal/mount';
import {block1,blockWithExternalType} from './sample-blocks';

test('mount should prefix type',()=>{
    const mounted = mount("point")(block1);
    expect(mounted.types.TYPE1).toEqual("POINT_TYPE1");
});

test('mount should prefix action result',()=>{
    const mounted = mount("point")(block1);
    expect(mounted.actions.action1("payload1")).toEqual({type:"POINT_TYPE1",payload:"payload1"});
});

test('mount should not prefix action result for unknown types',()=>{
    const mounted = mount("point")(blockWithExternalType);
    expect(mounted.actions.external("payload")).toEqual({type:"EXTERNAL",payload:"payload"});
});

test('mount should isolate state for selectors',()=>{
    const mounted = mount("point")(blockWithExternalType);
    const state = {point:{internal:"in",external:"ex"}};
    expect(mounted.selectors.internal(state)).toEqual("in");
    expect(mounted.selectors.external(state)).toEqual("ex");
});

test('mount should add mount point to state in reducer',()=>{
    const mounted = mount("point")(block1);
    let state = mounted.reducer(undefined,{type:"@@INIT"});
    expect(state).toEqual({
        point: {
            inner1:""
        }
    });
    state = mounted.reducer(state,{type:"POINT_TYPE1",payload:"payload1"});
    expect(state).toEqual({
        point: {
            inner1:"payload1"
        }
    });
});

