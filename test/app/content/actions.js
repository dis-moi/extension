import chai from 'chai';

import neverThrowingObject from '../../infrastructure/neverThrowingObject';

import prepareRecoEvents from '../../../src/app/content/actions/recommendations';
import prepareUIEvents from '../../../src/app/content/actions/ui';
import preparePrefEvents from '../../../src/app/content/actions/preferences';

const expect = chai.expect;

const {reduce, extend, deactivate} = prepareUIEvents(neverThrowingObject());
const { updateCriteria, updateEditors,
  selectCriterion, unselectCriterion,
  excludeEditor, includeEditor } = preparePrefEvents(neverThrowingObject());
const { recommendationFound, dismissReco, approveReco, reportReco } = prepareRecoEvents(neverThrowingObject());

describe('content actions', function () {

  it('recommendationFound', () => {
    const recos = [{}, {}];
    const mmc = [{}, {}];

    const action = recommendationFound(recos);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.recommendations).to.equal(recos);
  });

  it('reduce', () => {
    const action = reduce();

    expect(action.type).to.be.a('string').of.length.above(5);
  });

  it('extend', () => {
    const action = extend();

    expect(action.type).to.be.a('string').of.length.above(5);
  });

  it('deactivate', () => {
    const details = {};
    const action = deactivate(details);

    expect(action.type).to.be.a('string').of.length.above(5);
  });

  it('update criteria', () => {
    const criteria = {};
    const action = updateCriteria(criteria);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.criteria).to.equal(criteria);
  });

  it('select criterion', () => {
    const slug = 'slug';
    const action = selectCriterion(slug);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.slug).to.equal(slug);
  });

  it('unselect criterion', () => {
    const slug = 'slug';
    const action = unselectCriterion(slug);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.slug).to.equal(slug);
  });

  it('update editor', () => {
    const editors = {};
    const action = updateEditors(editors);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.editors).to.equal(editors);
  });

  it('exclude editor', () => {
    const id = 0;
    const action = excludeEditor(id);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.id).to.equal(id);
  });

  it('include editor', () => {
    const id = 0;
    const action = includeEditor(id);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.id).to.equal(id);
  });

  it('dismiss reco', () => {
    const id = 0;
    const action = dismissReco(id);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.id).to.equal(id);
  });

  it('approve reco', () => {
    const id = 0;
    const action = approveReco(id);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.id).to.equal(id);
  });

  it('report reco', () => {
    const id = 0;
    const action = reportReco(id);

    expect(action.type).to.be.a('string').of.length.above(5);
    expect(action.id).to.equal(id);
  });

});