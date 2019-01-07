import publish from './actions/publish';

export default {
  port: undefined,

  postMessage(msg) { this.port.postMessage(msg); },

  sendBackgroundReduxAction(backgroundAction) {
    this.postMessage(publish(backgroundAction));
  }
};
