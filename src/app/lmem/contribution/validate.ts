import { Contribution } from 'app/lmem/notice';
import isEmail from '../../utils/isEmail';
import Errors from '../Errors';

export default (contribution: Contribution): Errors => {
  const errors: Errors = {};
  const requiredFields: string[] = ['intention', 'message'];
  const requiredFieldMessage = 'Ce champs est obligatoire.';

  requiredFields.forEach(requiredField => {
    if (!contribution[requiredField]) {
      errors[requiredField] = requiredFieldMessage;
    }
  });

  const { contributor } = contribution;
  if (contributor) {
    errors.contributor = {};
    if (!contributor.name) {
      errors.contributor.name = requiredFieldMessage;
    }

    if (!contributor.email) {
      errors.contributor.email = requiredFieldMessage;
    }

    if (contributor.email && !isEmail(contributor.email)) {
      errors.contributor.email = "L'email n'est pas valide";
    }

    if (Object.keys(errors.contributor).length === 0) {
      delete errors.contributor;
    }
  }

  return errors;
};
