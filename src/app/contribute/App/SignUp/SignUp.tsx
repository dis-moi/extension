import React from 'react';
import { Button, Link, Title2 } from 'components/atoms';
import LogoDismoi from 'components/atoms/LogoDismoi';
import {
  CheckboxLine,
  Error,
  FormGroup,
  Input,
  Label
} from 'components/atoms/Forms';
import {
  BottomBar,
  ContentWrapper,
  Form,
  ImageWrapper,
  LogoWrapper,
  Wrapper
} from '../components';

const SignUp = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="" alt="img" />
      </ImageWrapper>

      <ContentWrapper>
        <LogoWrapper>
          <LogoDismoi />
        </LogoWrapper>

        <Title2>S&apos;enregistrer sur DisMoi</Title2>

        <Form>
          <FormGroup>
            <Label htmlFor="email">Votre adresse email *</Label>
            <Input type="email" id="email" />
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

          <Error align="center">Message d&apos;erreur</Error>

          <Button>Envoyer</Button>
        </Form>

        <BottomBar>
          Vous avez déjà un compte contributeur ?{' '}
          <Link to="">Vous connecter</Link>
        </BottomBar>
      </ContentWrapper>
    </Wrapper>
  );
};

export default SignUp;
