import chai from 'chai';
import { createMemoryHistory } from 'history'
import { Map as ImmutableMap } from 'immutable';
import { excludeEditor, includeEditor } from '../../../src/app/content/actions/filters';
import reducerCreator from '../../../src/app/content/reducers/';

const expect = chai.expect;

const reducer = reducerCreator(createMemoryHistory())

describe('content reducer', function () {

  it('exclude editor', () => {
    const id = 1;
    const action = excludeEditor(id);

    const nextState = reducer(
      new ImmutableMap({ editors: new ImmutableMap({"1": new ImmutableMap({id: 1, isExcluded: false})}) })
      , action );

    expect(nextState.get("editors").get("1").get("isExcluded")).to.be.true;
  });

  it('include editor', () => {
    const id = 1;
    const action = includeEditor(id);

    const nextState = reducer(
      new ImmutableMap({ editors: new ImmutableMap({"1": new ImmutableMap({id: 1, isExcluded: true})}) })
      , action );

    expect(nextState.get("editors").get("1").get("isExcluded")).to.be.false;
  });

});
