import { Field } from 'redux-form';
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { InputField } from 'components/organisms/Fields';
import { BackgroundButton, Button, CenterContainer } from 'components/atoms';

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
`;

interface Step2Props {
  disabled: boolean;
  submitting: boolean;
  setStep: (step: number) => void;
}

const Step2 = ({ disabled, submitting, setStep }: Step2Props) => {
  const { t } = useTranslation();
  return (
    <>
      {' '}
      <Label>Nom / pseudo à afficher</Label>
      <Field
        name="contributor.name"
        type="text"
        placeholder={t('form.field_name.placeholder')}
        component={InputField}
      />
      <Label>Adresse email de contact</Label>
      <Field
        name="contributor.email"
        type="email"
        placeholder={t('form.field_email.placeholder')}
        component={InputField}
      />
      <CenterContainer>
        <Button type={'button'} onClick={() => setStep(1)}>
          {t('action.go_back.back')}
        </Button>

        <BackgroundButton
          type="submit"
          disabled={disabled}
          loading={submitting}
        >
          {t('form.preview_send')}
        </BackgroundButton>
      </CenterContainer>
    </>
  );
};
export default Step2;
