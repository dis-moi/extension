import { FormErrors } from 'redux-form';
import { Contribution } from 'libs/domain/notice';
import validate from './validate';

export default (contribution: Contribution): FormErrors<Contribution> => {
  const errors = validate(contribution) as FormErrors<Contribution>;

  if (Object.keys(errors).length > 0) {
    errors._error = 'Les champs en rouge sont incorrects ou incomplets.';
  }

  return errors;
};
