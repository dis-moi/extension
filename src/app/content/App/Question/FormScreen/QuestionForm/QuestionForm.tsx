import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Field, InjectedFormProps } from 'redux-form';
import { Form } from 'components/atoms/Forms';
import { CenterContainer, BackgroundButton, Button } from 'components/atoms';
import {
  InputField,
  TextareaField,
  SelectField
} from 'components/organisms/Fields';
import FormErrors from 'components/molecules/FormErrors';
import { Contribution } from 'app/lmem/notice';
import withReduxForm from './withReduxForm';
import { StatefulContributor } from 'app/lmem/contributor';

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
  Contribution,
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

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="url" type="hidden" component={InputField} />
      <Field name="toContributorId" type="select" component={SelectField}>
        <option />
        {contributors.map(contributor => (
          <option key={contributor.id} value={contributor.id}>
            {contributor.name}
          </option>
        ))}
      </Field>
      <Field
        name="message"
        placeholder={`Indiquez votre question.
Précisez éventuellement le nom du média, de l'expert ou de l'informateur que vous souhaitez solliciter.
`}
        rows={4}
        component={Textarea}
      />
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
      <FormErrors errors={errors} globalError={error} />
      <CenterContainer>
        <BackButton>Annuler</BackButton>
        <BackgroundButton
          type="submit"
          disabled={!valid || submitting}
          loading={submitting}
        >
          Envoyer
        </BackgroundButton>
      </CenterContainer>
    </Form>
  );
};

export default withReduxForm(QuestionForm);
