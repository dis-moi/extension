import validate from './validate';
import { Contribution } from 'app/lmem/notice';

export default (contribution: Contribution): boolean =>
  Object.keys(validate(contribution)).length > 0;
