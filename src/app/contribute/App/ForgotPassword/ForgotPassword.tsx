import React from 'react';
import { Button, Link, Title2 } from 'components/atoms';
import { Error, FormGroup, Input, Label } from 'components/atoms/Forms';
import LogoDismoi from 'components/atoms/LogoDismoi';
import {
  BottomBar,
  ContentWrapper,
  ImageWrapper,
  LogoWrapper,
  Wrapper
} from '../components';

const ForgotPassword = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="" alt="img" />
      </ImageWrapper>

      <ContentWrapper>
        <LogoWrapper>
          <LogoDismoi />
        </LogoWrapper>

        <Title2>
          Lost your password? <br />
          Enter your email address below
        </Title2>

        <form>
          <FormGroup>
            <Label htmlFor="email">Votre adresse email *</Label>
            <Input type="email" id="email" />
          </FormGroup>

          <Error align="center">Message d&apos;erreur</Error>

          <Button>Envoyer</Button>
        </form>

        <BottomBar>
          Vous n&apos;avez pas de compte ? <Link to="">S&apos;inscrire</Link>
        </BottomBar>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ForgotPassword;
