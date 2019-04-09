import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import middleware from "../../../src/app/background/middlewares/analytics";
import { POPUP_CLICK } from "../../../src/app/constants/ActionTypes";
import { Action } from "redux";

const expect = chai.expect;
chai.use(sinonChai);

function create() {
  const next = sinon.stub();
  const track = sinon.stub();

  const invoke = (action: Action) => middleware(track)()(next)(action);

  return { next, track, invoke };
}

describe("Analytics middleware", () => {
  it("passes through api actions", () => {
    const { next, invoke } = create();
    const action = { type: "api/bypass" };
    invoke(action);
    expect(next).to.have.been.calledWith(action);
  });

  it("passes through persist actions", () => {
    const { next, invoke } = create();
    const action = { type: "persist/bypass" };
    invoke(action);
    expect(next).to.have.been.calledWith(action);
  });

  it("tracks actions", () => {
    const { track, invoke } = create();
    const action = { type: "gothroughthisone" };
    invoke(action);
    expect(track).to.have.been.calledWith(action);
  });
});
