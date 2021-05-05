import { Contribution } from 'libs/lmem/notice';
import validate from './validate';

export default (contribution: Contribution): boolean =>
  Object.keys(validate(contribution)).length > 0;
