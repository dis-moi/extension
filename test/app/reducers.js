import chai from "chai";
import { Map as ImmutableMap, Set as ImmutableSet, fromJS } from "immutable";

import prefsReducer from "../../src/app/background/reducers/prefs";
import resourcesReducer from "../../src/app/background/reducers/resources";

import makeInitialState from "../../src/app/background/store/makeInitialState";

import {
  receivedMatchingContexts,
  receivedCriteria,
  receivedEditors
} from "../../src/app/background/actions/kraftBackend";

import { deactivate } from "../../src/app/content/actions/ui";
import {
  excludeEditor,
  includeEditor
} from "../../src/app/content/actions/filters";
import {
  dismissNotice,
  likeNotice,
  unlikeNotice,
  dislikeNotice,
  undislikeNotice,
  undismissNotice,
  reportNotice
} from "../../src/app/content/actions/recommendations";

const expect = chai.expect;

describe("background reducer", function() {
  it("initial state + receivedMatchingContexts => state with offers", () => {
    const matchingContexts = new ImmutableSet([{}, {}]);
    const action = receivedMatchingContexts(matchingContexts);

    const nextState = resourcesReducer(
      makeInitialState().get("resources"),
      action
    );

    expect(action.payload.matchingContexts).to.be.an.instanceof(ImmutableSet);
    expect(nextState.get("matchingContexts")).to.have.size(
      matchingContexts.size
    );
  });

  it("initial state + criteria => state with criteria", () => {
    const criteria = new ImmutableMap({
      crit1: new ImmutableMap({ slug: "crit1" })
    });
    const action = receivedCriteria(criteria);

    const nextState = prefsReducer(makeInitialState().get("prefs"), action);

    expect(nextState.get("criteria")).to.have.size(1);
    expect(
      nextState
        .get("criteria")
        .get("crit1")
        .get("slug")
    ).to.equal("crit1");
    expect(
      nextState
        .get("criteria")
        .get("crit1")
        .get("isSelected")
    ).to.equal(true);
  });

  it("state with criteria + new criteria => state with memory of initial criteria", () => {
    const criteria = new ImmutableMap({
      crit2: new ImmutableMap({ slug: "crit2" })
    });
    const action = receivedCriteria(criteria);

    const nextState = prefsReducer(
      fromJS({
        criteria: {
          crit1: {
            slug: "crit1",
            isSelected: false
          }
        }
      }),
      action
    );

    expect(nextState.get("criteria")).to.have.size(2);
    expect(
      nextState
        .get("criteria")
        .get("crit1")
        .get("isSelected")
    ).to.equal(false);
    expect(
      nextState
        .get("criteria")
        .get("crit2")
        .get("isSelected")
    ).to.equal(true);
  });

  it("initial state + editors => state with editors", () => {
    const editors = new ImmutableMap({ 1: new ImmutableMap({ id: 1 }) });
    const action = receivedEditors(editors);

    const nextState = prefsReducer(makeInitialState().get("prefs"), action);

    expect(nextState.get("editors")).to.have.size(1);
    expect(
      nextState
        .get("editors")
        .get("1")
        .get("id")
    ).to.equal(1);
    expect(
      nextState
        .get("editors")
        .get("1")
        .get("isExcluded")
    ).to.equal(false);
  });

  it("state with editors + new editors => state with memory of initial editors", () => {
    const editors = new ImmutableMap({ 2: new ImmutableMap({ id: 2 }) });
    const action = receivedEditors(editors);

    const nextState = prefsReducer(
      fromJS({
        editors: {
          1: {
            id: 1,
            isExcluded: true
          }
        }
      }),
      action
    );

    expect(nextState.get("editors")).to.have.size(2);
    expect(
      nextState
        .get("editors")
        .get("1")
        .get("isExcluded")
    ).to.equal(true);
    expect(
      nextState
        .get("editors")
        .get("2")
        .get("isExcluded")
    ).to.equal(false);
  });

  it("initial state + deactivate (everywhere) => state with deactivated pref", () => {
    const action = deactivate({
      where: DEACTIVATE_EVERYWHERE,
      duration: 1000
    });

    const nextState = prefsReducer(makeInitialState().get("prefs"), action);

    expect(
      nextState
        .get("websites")
        .get("deactivated")
        .get("everywhereUntil")
    ).to.be.above(Date.now());
  });

  it("exclude editor", () => {
    const action = excludeEditor(1);

    const nextState = prefsReducer(
      fromJS({
        editors: {
          "1": {
            id: 1,
            isExcluded: false
          }
        }
      }),
      action
    );

    expect(nextState.get("editors")).to.have.size(1);
    expect(
      nextState
        .get("editors")
        .get("1")
        .get("isExcluded")
    ).to.be.true;
  });

  it("include editor", () => {
    const action = includeEditor(1);

    const nextState = prefsReducer(
      fromJS({
        editors: {
          "1": {
            id: 1,
            isExcluded: true
          }
        }
      }),
      action
    );

    expect(nextState.get("editors")).to.have.size(1);
    expect(
      nextState
        .get("editors")
        .get("1")
        .get("isExcluded")
    ).to.be.false;
  });

  it("dismiss notice", () => {
    const action = dismissNotice(1);

    const nextState = prefsReducer(
      fromJS({ dismissedNotices: new ImmutableSet() }),
      action
    );

    expect(nextState.get("dismissedNotices")).to.have.size(1);
  });

  it("like notice", () => {
    const action = likeNotice(1);

    const nextState = prefsReducer(
      fromJS({ likedNotices: new ImmutableSet() }),
      action
    );

    expect(nextState.get("likedNotices")).to.have.size(1);
  });

  it("dislike notice", () => {
    const action = dislikeNotice(1);

    const nextState = prefsReducer(
      fromJS({ dislikedNotices: new ImmutableSet() }),
      action
    );

    expect(nextState.get("dislikedNotices")).to.have.size(1);
  });

  it("undismiss notice", () => {
    const action = undismissNotice(42);

    const nextState = prefsReducer(
      fromJS({ dismissedNotices: new ImmutableSet([42]) }),
      action
    );

    expect(nextState.get("dismissedNotices")).to.have.size(0);
  });

  it("unlike notice", () => {
    const action = unlikeNotice(42);

    const nextState = prefsReducer(
      fromJS({ likedNotices: new ImmutableSet([42]) }),
      action
    );

    expect(nextState.get("likedNotices")).to.have.size(0);
  });

  it("undislike notice", () => {
    const action = undislikeNotice(42);

    const nextState = prefsReducer(
      fromJS({ dislikedNotices: new ImmutableSet([42]) }),
      action
    );

    expect(nextState.get("dislikedNotices")).to.have.size(0);
  });

  it("report notice", () => {
    const action = reportNotice(1);

    const nextState = prefsReducer(
      fromJS({ reportedNotices: new ImmutableSet() }),
      action
    );

    expect(nextState.get("reportedNotices")).to.have.size(1);
  });
});
