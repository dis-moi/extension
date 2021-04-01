import React from 'react';
import { BackgroundButton, Link, Paragraph } from 'components/atoms';
import { Error, FormGroup, Input, Label } from 'components/atoms/Forms';
import { BottomBar, Wrapper } from '../components';

const ForgotPassword = () => {
  return (
    <Wrapper>
      <Paragraph>Lost your password? Enter your email address below</Paragraph>

      <form>
        <FormGroup>
          <Label htmlFor="email">Votre adresse email *</Label>
          <Input type="email" id="email" />
        </FormGroup>

        <Error>Message d&apos;erreur</Error>

        <BackgroundButton>Envoyer</BackgroundButton>
      </form>

      <BottomBar>
        Vous n&apos;avez pas de compte ? <Link to="">S&apos;inscrire</Link>
      </BottomBar>
    </Wrapper>
  );
};

export default ForgotPassword;
