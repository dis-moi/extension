import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import styled from 'styled-components';

import { Contribution } from 'app/lmem/notice';
import NoticePreview from 'components/organisms/NoticePreview';
import { BorderButton, Button } from 'components/atoms';
import { Form } from 'components/atoms/Forms';
import FormErrors from '../ContributeScreen/FormErrors';
import { handleFormSubmit } from 'app/utils/form';
import withReduxForm from './withReduxForm';

const PreviewForm = styled(Form)`
  padding: 12px 16px 12px 16px;
  display: flex;
  justify-content: space-around;
  min-width: 60%;
  self-align: center;
  align-self: center;
`;

export interface PreviewScreenOwnProps {
  contribution: Contribution;
  modify: () => void;
  publish: (contribution: Contribution, meta: any) => void;
  errors: string[];
}

export type PreviewScreenProps = InjectedFormProps<
  Contribution,
  PreviewScreenOwnProps
> &
  PreviewScreenOwnProps;

class PreviewScreen extends Component<PreviewScreenProps> {
  get isButtonDisabled() {
    const { valid, submitting } = this.props;
    return !valid || submitting;
  }

  render() {
    const {
      contribution,
      handleSubmit,
      form,
      submitting,
      modify,
      publish,
      error,
      errors
    } = this.props;

    return (
      <NoticePreview contribution={contribution}>
        <PreviewForm
          onSubmit={handleFormSubmit({ handleSubmit, form })(publish)}
        >
          <Button onClick={modify}>Modifier</Button>
          <BorderButton
            type="submit"
            disabled={this.isButtonDisabled}
            loading={submitting}
          >
            Publier
          </BorderButton>
          <FormErrors errors={errors} globalError={error} />
        </PreviewForm>
      </NoticePreview>
    );
  }
}

export default withReduxForm(PreviewScreen);
