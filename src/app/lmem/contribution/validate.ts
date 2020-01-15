import * as R from 'ramda';
import { Contribution } from 'app/lmem/notice';
import isEmail from '../../utils/isEmail';
import ValidationErrors from '../ValidationErrors';

export interface ContributionValidationErrors extends ValidationErrors {
  intention?: string;
  message?: string;
  contributor?: {
    name?: string;
    email?: string;
  };
}
type Errors = ContributionValidationErrors;

const setRequiredFieldError = (errors: Errors) => (
  requiredPath: string[]
): Errors => R.assocPath(requiredPath, 'Ce champs est obligatoire.', errors);

const validateRequiredPaths = (contribution: Contribution) => (
  errors: Errors
) =>
  R.reduce(
    (err: Errors, requiredPath: string[]) =>
      R.path(requiredPath, contribution)
        ? err
        : setRequiredFieldError(err)(requiredPath),
    errors
  )([
    ['intention'],
    ['message'],
    ['contributor', 'name'],
    ['contributor', 'email']
  ]);

const hasInvalidContributorEmail = R.compose(
  R.not,
  isEmail,
  R.defaultTo(''),
  R.path<string>(['contributor', 'email'])
);
const validateContributorEmail = (contribution: Contribution) => (
  errors: Errors
): Errors =>
  hasInvalidContributorEmail(contribution)
    ? R.assocPath(['contributor', 'email'], "L'email n'est pas valide.", errors)
    : errors;

const validateContribution = (contribution: Contribution): Errors =>
  R.pipe(
    validateRequiredPaths(contribution),
    validateContributorEmail(contribution)
  )({});

export default validateContribution;
