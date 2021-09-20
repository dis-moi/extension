import { Field } from 'redux-form';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextareaField } from 'components/organisms/Fields';
import { BackgroundButton, CenterContainer } from 'components/atoms';
import { withMessageValue } from './withReduxForm';

interface StepProps {
  setStep: (step: number) => void;
  message: string;
}

const Step1 = ({ setStep, message }: StepProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Field
        name="message"
        placeholder={t('form.field_message.placeholder')}
        rows={5}
        component={TextareaField}
      />
      <CenterContainer>
        <BackgroundButton disabled={!message} onClick={() => setStep(2)}>
          {t('view.contributions.button_subtext')}
        </BackgroundButton>
      </CenterContainer>
    </>
  );
};

export default withMessageValue(Step1);
