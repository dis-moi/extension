import React, { Component } from 'react';
import { WrappedFieldProps } from 'redux-form';
import IntentionsSelector from 'components/molecules/IntentionsSelector';

export default class IntentionsSelectorField extends Component<
  WrappedFieldProps
> {
  render() {
    const { input } = this.props;

    return <IntentionsSelector {...input} />;
  }
}
