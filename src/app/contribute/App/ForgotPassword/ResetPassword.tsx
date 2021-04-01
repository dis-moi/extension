import React from 'react';
import { BackgroundButton, Paragraph } from 'components/atoms';
import { Error, FormGroup, Input, Label } from 'components/atoms/Forms';
import { Wrapper } from '../components';

const ResetPassword = () => {
  return (
    <Wrapper>
      <Paragraph>Lost your password? Enter your email address below</Paragraph>

      <form>
        <FormGroup>
          <Label htmlFor="password">Votre mot de passe *</Label>
          <Input type="password" id="password" />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password2">Retapez votre mot de passe *</Label>
          <Input type="password" id="password2" />
        </FormGroup>

        <Error>Message d&apos;erreur</Error>

        <BackgroundButton>Envoyer</BackgroundButton>
      </form>
    </Wrapper>
  );
};

export default ResetPassword;
