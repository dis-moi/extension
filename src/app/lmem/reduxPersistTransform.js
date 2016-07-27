import { createTransform } from 'redux-persist';

export default createTransform(
  inboundState => {
    return JSON.stringify(inboundState, (key, value) => {
      if (Object.prototype.toString.call(value) === '[object Set]') {
        return [...value];
      }
      return value;
    });
  },
  outboundState => {
    return JSON.parse(outboundState, function (k, v) {
      if (k === 'deactivatedWebsites') {
        return new Set(v);
      }
      return v; // return everything else unchanged
    });
  }
);