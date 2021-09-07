import { Field } from 'redux-form';
import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextareaField } from 'components/organisms/Fields';
import { BackgroundButton, CenterContainer } from 'components/atoms';

interface StepProps {
  setStep: (step: number) => void;
}

const Step1 = ({ setStep }: StepProps) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  return (
    <>
      <Field
        name="message"
        placeholder={t('form.field_message.placeholder')}
        rows={5}
        onChange={(e: ChangeEvent<{ value: string }>) =>
          setMessage(e.target.value)
        }
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
export default Step1;
