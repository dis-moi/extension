import {LMEM_SCRIPTS_ORIGIN} from '../../constants/origins';

export default (input, init) => fetch(`${LMEM_SCRIPTS_ORIGIN}${input}`, init)
  .then(resp => resp.text());
