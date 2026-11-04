import * as R from 'ramda';

const overProp = (prop: string) => R.over(R.lensProp(prop));
export const overPrefs = overProp('prefs');
