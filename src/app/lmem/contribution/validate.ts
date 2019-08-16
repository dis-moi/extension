import * as R from 'ramda';
import { Contribution } from 'app/lmem/notice';
import isEmail from '../../utils/isEmail';
import Errors from '../Errors';

export default (contribution: Contribution): Errors => {
  let errors: Errors = {
    contributor: {}
  };
  const requiredPaths: any[] = [
    ['intention'],
    ['message'],
    ['contributor', 'name'],
    ['contributor', 'email']
  ];
  const requiredFieldMessage = 'Ce champs est obligatoire.';

  requiredPaths.forEach(requiredPath => {
    if (!R.path(requiredPath, contribution)) {
      // @ts-ignore
      errors = R.assocPath(requiredPath, requiredFieldMessage, errors);
      console.log('=>', errors);
    }
  });

  const { contributor } = contribution;
  if (contributor && contributor.email && !isEmail(contributor.email)) {
    // @ts-ignore
    errors.contributor.email = "L'email n'est pas valide";
  }

  if (Object.keys(errors.contributor).length === 0) {
    delete errors.contributor;
  }

  return errors;
};
