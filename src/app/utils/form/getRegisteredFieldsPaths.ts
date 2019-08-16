import { RegisteredFieldState } from 'redux-form';

export default (registeredFields: RegisteredFieldState[]) =>
  Object.keys(registeredFields).map(registeredField =>
    registeredField.split('.')
  );
