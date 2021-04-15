import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Input } from 'libs/components/atoms/Forms';

export default class InputField extends Component<WrappedFieldProps> {
  render() {
    const {
      meta: { touched, error },
      input,
      ...props
    } = this.props;

    return <Input {...input} {...props} error={touched && error} />;
  }
}
