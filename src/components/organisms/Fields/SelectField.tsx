import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Select } from 'components/atoms/Forms';

export default class SelectField extends Component<WrappedFieldProps> {
  render() {
    const {
      meta: { touched, error },
      input,
      ...props
    } = this.props;

    return <Select {...input} {...props} error={touched && error} />;
  }
}
