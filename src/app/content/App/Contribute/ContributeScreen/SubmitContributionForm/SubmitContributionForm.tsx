import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Trans } from 'react-i18next';
import { Field, InjectedFormProps } from 'redux-form';
import { Form } from 'components/atoms/Forms';
import { InputField } from 'components/organisms/Fields';
import FormErrors from 'components/molecules/FormErrors';
import Title from 'components/atoms/Title/';
import { Contribution } from 'libs/domain/notice';
import withReduxForm from './withReduxForm';
import Step1 from './Step1';
import Step2 from './Step2';

const NoNoticeTitle = styled(Title)`
  margin-right: 42px;
  margin-left: 42px;

  span {
    display: block;
    margin-top: 16px;
    margin-right: -20px;
    margin-left: -20px;
    font-size: 16px;
    font-weight: normal;
  }
`;

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
    <>
      <NoNoticeTitle>
        <Trans i18nKey={'view.contributions.disclaimer_no_post_step' + step}>
          Text1
          <span>Text2</span>
        </Trans>
      </NoNoticeTitle>
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
    </>
  );
};

export default withReduxForm(SubmitContributionForm);
