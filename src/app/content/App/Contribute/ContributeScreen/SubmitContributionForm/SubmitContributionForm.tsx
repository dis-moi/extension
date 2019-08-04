import React, { Component } from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { Form, Error } from 'components/atoms/Forms';
import { CenterContainer, BorderButton } from 'components/atoms';
import {
  InputField,
  IntentionsSelectorField,
  TextareaField
} from 'components/organisms/Fields';
import { Contribution } from 'app/lmem/notice';
import withReduxForm from './withReduxForm';

export interface SubmitContributionFormOwnProps {
  onSubmit: (...args: any[]) => void;
}

export type SubmitContributionFormProps = InjectedFormProps<
  Contribution,
  SubmitContributionFormOwnProps
> &
  SubmitContributionFormOwnProps;

class SubmitContributionForm extends Component<SubmitContributionFormProps> {
  get isButtonDisabled() {
    return !this.props.valid || this.props.submitting;
  }

  render() {
    const { handleSubmit, submitting, error, anyTouched } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <Field name="url" type="hidden" component={InputField} />
        <Field name="intention" component={IntentionsSelectorField} />
        <Field
          name="contributor.name"
          type="text"
          placeholder="Votre nom"
          component={InputField}
        />
        <Field
          name="contributor.email"
          type="email"
          placeholder="Votre@email.fr"
          component={InputField}
        />
        <Field
          name="message"
          placeholder="Ecrire le message que vous souhaitez publier"
          rows={5}
          component={TextareaField}
        />
        <CenterContainer>
          <BorderButton
            type="submit"
            disabled={this.isButtonDisabled}
            loading={submitting}
          >
            prévisualiser et publier
          </BorderButton>
        </CenterContainer>

        {anyTouched && error && <Error>{error}</Error>}
      </Form>
    );
  }
}

export default withReduxForm(SubmitContributionForm);
