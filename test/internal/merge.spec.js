import merge from '../../src/internal/merge';
import {block1,block2} from './sample-blocks';

test('merge combines types',()=>{
    const merged = merge(block1,block2);
    expect(merged.types.TYPE1).toEqual("TYPE1");
    expect(merged.types.TYPE2).toEqual("TYPE2");
});

test('merge combines actions',()=>{
    const merged = merge(block1,block2);
    expect(merged.actions.action1("payload1")).toEqual({type:"TYPE1",payload:"payload1"});
    expect(merged.actions.action2("payload2")).toEqual({type:"TYPE2",payload:"payload2"});
});

test('merge combines selectors',()=>{
    const merged = merge(block1,block2);
    const state = {inner1:"i1",inner2:"i2"};
    expect(merged.selectors.select1(state)).toEqual("i1");
    expect(merged.selectors.select2(state)).toEqual("i2");
});

test('merge combines reducers',()=>{
    const merged = merge(block1,block2);
    let state = merged.reducer({inner1:"initial",inner2:"initial"},{type:"@@INIT"});
    expect(state).toEqual({
        inner1:"initial",
        inner2:"initial"
    });
    state = merged.reducer(state,{type:"TYPE1",payload:"payload1"});
    expect(state).toEqual({
        inner1:"payload1",
        inner2:"initial"
    });
    state = merged.reducer(state,{type:"TYPE2",payload:"payload2"});
    expect(state).toEqual({
        inner1:"payload1",
        inner2:"payload2"
    });
});

