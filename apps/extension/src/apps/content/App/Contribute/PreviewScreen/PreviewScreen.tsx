import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import styled from 'styled-components';

import { Contribution } from 'libs/lmem/notice';
import { FormMeta } from 'src/app/actions';
import NoticePreview from 'libs/components/organisms/NoticePreview';
import { BackgroundButton, Button } from 'src/components/atoms';
import { Error, Form } from 'src/components/atoms/Forms';
import { handleFormSubmit } from 'src/app/utils/form';
import withReduxForm from './withReduxForm';

const PreviewForm = styled(Form)`
  padding: 12px 16px 12px 16px;
  display: flex;
  justify-content: space-around;
  min-width: 60%;
  align-self: center;
`;

export interface PreviewScreenOwnProps {
  contribution: Contribution;
  modify: () => void;
  publish: (contribution: Contribution, meta: FormMeta) => void;
  errors: string[];
}

export type PreviewScreenProps = InjectedFormProps<
  Contribution,
  PreviewScreenOwnProps
> &
  PreviewScreenOwnProps & { t: TFunction };
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
      dirty,
      error,
      t
    } = this.props;
    return (
      <NoticePreview contribution={contribution}>
        <PreviewForm
          onSubmit={handleFormSubmit({ handleSubmit, form })(publish)}
        >
          <Button onClick={modify}>{t('action.edit')}</Button>
          <BackgroundButton
            type="submit"
            disabled={this.isButtonDisabled}
            loading={submitting}
          >
            {t('action.publish')}
          </BackgroundButton>
        </PreviewForm>
        {dirty && error && <Error>{error}</Error>}
      </NoticePreview>
    );
  }
}

export default withReduxForm(withTranslation()(PreviewScreen));
