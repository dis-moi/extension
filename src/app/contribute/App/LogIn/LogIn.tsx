import React from 'react';
import { Error, FormGroup, Input, Label } from 'components/atoms/Forms';
import { Title2 } from 'components/atoms/Titles';
import { Button, Link } from 'components/atoms';
import LogoDismoi from 'components/atoms/LogoDismoi';
import {
  BottomBar,
  ContentWrapper,
  ImageWrapper,
  Wrapper,
  LogoWrapper,
  Form
} from '../components';

const LogIn = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="" alt="img" />
      </ImageWrapper>

      <ContentWrapper>
        <LogoWrapper>
          <LogoDismoi />
        </LogoWrapper>
        <Title2>Se connecter sur DisMoi</Title2>

        <Form>
          <FormGroup>
            <Label htmlFor="email">Votre adresse email *</Label>
            <Input type="email" id="email" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Choisissez un mot de passe *</Label>
            <Input type="password" id="password" />
            <p>
              <Link to="">Mot de passe oublié ?</Link>
            </p>
          </FormGroup>

          <Error align="center">
            Aucun compte trouvé. <br />
            Veuillez vérifier votre email.
          </Error>

          <Button>Envoyer</Button>
        </Form>

        <BottomBar>
          Pas encore inscrit ? <Link to="">Créer un compte</Link>
        </BottomBar>
      </ContentWrapper>
    </Wrapper>
  );
};

export default LogIn;
