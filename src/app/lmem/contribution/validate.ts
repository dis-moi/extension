import * as R from 'ramda';
import { Contribution } from 'app/lmem/notice';
import isEmail from '../../utils/isEmail';
import ValidationErrors from '../ValidationErrors';

export default (contribution: Contribution): ValidationErrors => {
  let errors: ValidationErrors = {
    contributor: {}
  };
  const requiredPaths: string[][] = [
    ['intention'],
    ['message'],
    ['contributor', 'name'],
    ['contributor', 'email']
  ];
  const requiredFieldMessage = 'Ce champs est obligatoire.';

  requiredPaths.forEach(requiredPath => {
    if (!R.path(requiredPath, contribution)) {
      errors = R.assocPath(requiredPath, requiredFieldMessage, errors);
    }
  });

  const { contributor } = contribution;
  if (contributor && contributor.email && !isEmail(contributor.email)) {
    // @ts-ignore
    errors.contributor.email = "L'email n'est pas valide"; // eslint-disable-line
  }

  if (Object.keys(errors.contributor).length === 0) {
    delete errors.contributor;
  }

  return errors;
};
