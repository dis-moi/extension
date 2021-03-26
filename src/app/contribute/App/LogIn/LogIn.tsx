import React from 'react';
import styled from 'styled-components';
import { Error, Input, Label } from 'components/atoms/Forms';
import { BackgroundButton, Link, Title } from 'components/atoms';

const Wrapper = styled.section`
  max-width: 768px;
  width: 100%;
`;

const FormGroup = styled.div`
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const BottomBar = styled.div`
  margin-top: 100px;
`;

const SignUp = () => {
  return (
    <Wrapper>
      <Title>Se connecter sur DisMoi</Title>
      <form>
        <FormGroup>
          <Label htmlFor="email">Votre adresse email *</Label>
          <Input type="text" id="email" />
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
