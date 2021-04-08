import React from 'react';
import { Error, FormGroup, Input, Label } from 'components/atoms/Forms';
import { Title2 } from 'components/atoms/Titles';
import { BackgroundButton, Link } from 'components/atoms';
import {
  BottomBar,
  ContentWrapper,
  ImageWrapper,
  Wrapper
} from '../components';
import { Logo } from '../../../../components/atoms/icons';
import LogoDismoi from '../../../../components/atoms/LogoDismoi';

const LogIn = () => {
  return (
    <Wrapper>
      <ImageWrapper>
        <img src="" alt="img" />
      </ImageWrapper>

      <ContentWrapper>
        <LogoDismoi></LogoDismoi>
        <Title2>Se connecter sur DisMoi</Title2>

        <form>
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

          <Error>Message d&apos;erreur</Error>

          <BackgroundButton>Envoyer</BackgroundButton>
        </form>
        <BottomBar>
          Pas encore inscrit ? <Link to="">Créer un compte</Link>
        </BottomBar>
      </ContentWrapper>
    </Wrapper>
  );
};

export default LogIn;
