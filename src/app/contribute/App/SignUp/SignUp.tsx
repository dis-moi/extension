import React from 'react';
import styled from 'styled-components';
import { Input, Label } from 'components/atoms/Forms';
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

const CheckboxLine = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

const BottomBar = styled.div`
  margin-top: 100px;
`;

const SignUp = () => {
  return (
    <Wrapper>
      <Title>S&apos;enregistrer sur DisMoi</Title>
      <form>
        <FormGroup>
          <Label htmlFor="email">Votre adresse email *</Label>
          <Input type="text" id="email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Choisissez un mot de passe *</Label>
          <Input type="password" id="password" />
        </FormGroup>

        <FormGroup>
          <CheckboxLine>
            <input type="checkbox" id="cgu" />
            <Label htmlFor="cgu">
              J&apos;accepte les <Link to="">CGU</Link>
            </Label>
          </CheckboxLine>

          <CheckboxLine>
            <input type="checkbox" id="emails" />
            <Label htmlFor="emails">Vas-y envoie de l&apos;email</Label>
          </CheckboxLine>
        </FormGroup>

        <BackgroundButton>Envoyer</BackgroundButton>
      </form>
      <BottomBar>
        Vous avez déjà un compte contributeur ?{' '}
        <Link to="">Vous connecter</Link>
      </BottomBar>
    </Wrapper>
  );
};

export default SignUp;
