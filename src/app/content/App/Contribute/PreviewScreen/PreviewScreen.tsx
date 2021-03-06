import React, { Component } from 'react';
import { InjectedFormProps } from 'redux-form';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import styled from 'styled-components';

import { Contribution } from 'libs/domain/notice';
import { FormMeta } from 'libs/store/actions';
import NoticePreview from 'components/organisms/NoticePreview';
import { BackgroundButton, Button } from 'components/atoms';
import { Error, Form } from 'components/atoms/Forms';
import { handleFormSubmit } from 'libs/utils/form';
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
