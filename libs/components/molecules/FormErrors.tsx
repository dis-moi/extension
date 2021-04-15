import React from 'react';
import { Error } from 'libs/components/atoms/Forms';

export interface FormErrorsProps {
  errors: string[];
  globalError: string;
}

export const FormErrors = ({ errors, globalError }: FormErrorsProps) => {
  if (errors.length > 0) {
    if (errors.length === 1) {
      return <Error>{errors[0]}</Error>;
    }

    return globalError ? <Error>{globalError}</Error> : null;
  }

  return null;
};

export default FormErrors;
