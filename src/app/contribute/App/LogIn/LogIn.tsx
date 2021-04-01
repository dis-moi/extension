import React from 'react';
import { Error, FormGroup, Input, Label } from 'components/atoms/Forms';
import { BackgroundButton, Link, Title } from 'components/atoms';
import { BottomBar, Wrapper } from '../components';

const SignUp = () => {
  return (
    <Wrapper>
      <Title>Se connecter sur DisMoi</Title>
      <form>
        <FormGroup>
          <Label htmlFor="email">Votre adresse email *</Label>
          <Input type="email" id="email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Choisissez un mot de passe *</Label>
          <Input type="password" id="password" />
          <p>
            Mot de passe oublié ? Le <Link to="">remettre à zéro</Link>
          </p>
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

export default SignUp;
