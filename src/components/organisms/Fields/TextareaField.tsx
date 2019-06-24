import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import { Textarea } from 'components/atoms/Forms';

export default class TextareaField extends Component<WrappedFieldProps> {
  render() {
    const {
      meta: { touched, error },
      input,
      ...props
    } = this.props;

    return <Textarea {...input} {...props} error={touched && error} />;
  }
}
