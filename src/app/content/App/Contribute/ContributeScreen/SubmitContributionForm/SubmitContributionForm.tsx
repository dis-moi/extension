import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, InjectedFormProps } from 'redux-form';
import { Form, FormGroup } from 'components/atoms/Forms';
import { CenterContainer, BackgroundButton } from 'components/atoms';
import { InputField, TextareaField } from 'components/organisms/Fields';
import FormErrors from 'components/molecules/FormErrors';
import { Contribution } from 'app/lmem/notice';
import withReduxForm from './withReduxForm';

export interface SubmitContributionFormOwnProps {
  onUrlChange: (url: string) => void;
  onSubmit: (...args: any[]) => void;
  errors: string[];
}

export type SubmitContributionFormProps = InjectedFormProps<
  Contribution,
  SubmitContributionFormOwnProps
> &
  SubmitContributionFormOwnProps;

const SubmitContributionForm = ({
  valid,
  handleSubmit,
  submitting,
  error,
  errors,
  onUrlChange
}: SubmitContributionFormProps) => {
  useEffect(() => {
    onUrlChange(window.location.href);
  }, [window.location.href]);

  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="url" type="hidden" component={InputField} />

      <FormGroup>
        <Field
          name="contributor.name"
          type="text"
          placeholder={t('form.field_name.placeholder')}
          component={InputField}
        />
      </FormGroup>

      <FormGroup>
        <Field
          name="contributor.email"
          type="email"
          placeholder={t('form.field_email.placeholder')}
          component={InputField}
        />
      </FormGroup>

      <FormGroup>
        <Field
          name="message"
          placeholder={t('form.field_message.placeholder')}
          rows={5}
          component={TextareaField}
        />
      </FormGroup>

      <CenterContainer>
        <BackgroundButton
          type="submit"
          disabled={!valid || submitting}
          loading={submitting}
        >
          {t('form.preview_send')}
        </BackgroundButton>
      </CenterContainer>

      <FormErrors errors={errors} globalError={error} />
    </Form>
  );
};

export default withReduxForm(SubmitContributionForm);
