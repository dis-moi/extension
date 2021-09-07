import React, { useEffect, useState } from 'react';
import { Field, InjectedFormProps } from 'redux-form';
import { Form } from 'components/atoms/Forms';
import { InputField } from 'components/organisms/Fields';
import FormErrors from 'components/molecules/FormErrors';
import { Contribution } from 'libs/domain/notice';
import withReduxForm from './withReduxForm';
import Step1 from './Step1';
import Step2 from './Step2';

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
  const [step, setStep] = useState(1);

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="url" type="hidden" component={InputField} />
      {step === 1 && <Step1 setStep={setStep} />}
      {step === 2 && (
        <Step2
          disabled={!valid || submitting}
          submitting={submitting}
          setStep={setStep}
        />
      )}
      <FormErrors errors={errors} globalError={error} />
    </Form>
  );
};

export default withReduxForm(SubmitContributionForm);
