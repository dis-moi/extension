import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Field, InjectedFormProps } from 'redux-form';
import { Form } from 'src/components/atoms/Forms';
import {
  CenterContainer,
  BackgroundButton,
  Button
} from 'src/components/atoms';
import {
  InputField,
  TextareaField,
  SelectField
} from 'src/components/organisms/Fields';
import FormErrors from 'libs/components/molecules/FormErrors';
import { Question } from 'libs/lmem/notice';
import withReduxForm from './withReduxForm';
import { StatefulContributor } from 'libs/lmem/contributor';

export interface QuestionFormOwnProps {
  onUrlChange: (url: string) => void;
  onSubmit: (...args: any[]) => void;
  errors: string[];
  error?: string;
  contributors: StatefulContributor[];
}

const Textarea = styled(TextareaField)`
  height: 140px;
`;

const BackButton = styled(Button)`
  text-transform: none;
  font-size: 16px;
`;

export type QuestionFormProps = InjectedFormProps<
  Question,
  QuestionFormOwnProps
> &
  QuestionFormOwnProps;

const QuestionForm = ({
  valid,
  handleSubmit,
  submitting,
  error,
  errors,
  onUrlChange,
  contributors
}: QuestionFormProps) => {
  useEffect(() => {
    onUrlChange(window.location.href);
  }, [window.location.href]);

  const { t } = useTranslation();

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="question" type="hidden" component={InputField} />
      <Field name="url" type="hidden" component={InputField} />
      <Field name="toContributorId" type="select" component={SelectField}>
        <option value={''}>{t('form.field_contributor_source.label')}</option>
        {contributors.map(contributor => (
          <option key={contributor.id} value={contributor.id}>
            {contributor.name}
          </option>
        ))}
      </Field>
      <Field
        name="message"
        placeholder={t('form.field_message_question.placeholder')}
        rows={4}
        component={Textarea}
      />
      <Field
        name="contributor.name"
        type="text"
        placeholder={t('form.field_name.placeholder')}
        component={InputField}
      />
      <Field
        name="contributor.email"
        type="email"
        placeholder={t('form.field_email.placeholder')}
        component={InputField}
      />
      <FormErrors errors={errors} globalError={error} />
      <CenterContainer>
        <BackButton>{t('action.cancel')}</BackButton>
        <BackgroundButton
          type="submit"
          disabled={!valid || submitting}
          loading={submitting}
        >
          {t('action.preview')}
        </BackgroundButton>
      </CenterContainer>
    </Form>
  );
};

export default withReduxForm(QuestionForm);
