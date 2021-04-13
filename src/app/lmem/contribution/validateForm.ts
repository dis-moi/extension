import { FormErrors } from 'redux-form';
import validate from './validate';
import { Contribution } from 'app/lmem/notice';

export default (contribution: Contribution): FormErrors<Contribution> => {
  const errors = validate(contribution) as FormErrors<Contribution>;

  if (Object.keys(errors).length > 0) {
    errors._error = 'Les champs en rouge sont incorrects ou incomplets.';
  }

  return errors;
};
