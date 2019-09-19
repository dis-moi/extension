import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';
import Logo from 'components/atoms/icons/Logo';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Title from '../OnboardingAtoms/OnboardingTitle';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import Steps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';
import OnboardinButton from '../OnboardingAtoms/OnboardingButton';

const TOSTitle = styled.h3`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

const TOSList = styled.ol`
  margin-bottom: 2rem;
  padding-left: 0;
  counter-reset: TOS;
  list-style-type: none;
`;

const TOSListItem = styled.li`
  margin-bottom: 20px;
  font-size: 22px;

  &:before {
    content: counter(TOS) '.';
    counter-increment: TOS;
    margin-right: 16px;
    font-weight: bold;
    font-size: 23px;
  }
`;

const TOSText = styled.p`
  font-size: 18px;
`;

const TOSForm = styled.form`
  display: flex;
  align-items: center;
  font-size: 20px;

  [type='checkbox'] {
    align-self: baseline;
  }

  label {
    margin-left: 12px;
  }
`;

interface TosProps {
  updatedFromLmem: boolean;
  termsOfServiceAccepted: boolean;
  acceptTermsOfService: () => void;
}

export default ({
  updatedFromLmem,
  termsOfServiceAccepted,
  acceptTermsOfService
}: TosProps) => (
  <Wrapper>
    <Intro>
      {updatedFromLmem && (
        <>
          <p>Le Même en mieux -- Bulles</p>
          <TOSTitle>
            Votre extension s&apos;ouvre à de nouveaux contributeurs et change
            de nom.
          </TOSTitle>

          <Steps />
        </>
      )}
      <Logo />

      <Title>Installation réussie !</Title>
      <SubTitle>
        Veuillez prendre connaissance des principes du service <br />
        et des conditions générales d’utilisation.
      </SubTitle>
    </Intro>

    <TOSTitle>Principes du service</TOSTitle>

    <TOSList>
      <TOSListItem>
        <strong>Liberté d’information</strong> : Vous recevez l’information que
        vous avez choisie.
      </TOSListItem>
      <TOSListItem>
        <strong>Pas de publicité</strong>
      </TOSListItem>
      <TOSListItem>
        <strong>
          Anonymat: Pas d’email ni de compte nécessaires pour naviguer avec
          Bulles
        </strong>
      </TOSListItem>
      <TOSListItem>
        <strong>Seules des données strictement utiles</strong> au fonctionnement
        du service sont collectées
      </TOSListItem>
      <TOSListItem>
        <strong>Aucune revente ni divulgation de données</strong>
      </TOSListItem>
    </TOSList>

    <TOSText>
      Ces principes ne se substituent pas à la lecture détaillée des Conditions
      Générales d’utilisation que vous devez accepter (ci-dessous) pour naviguer
      avec Bulles.
    </TOSText>

    <TOSTitle>Conditions générales d’utilisation</TOSTitle>
    <TOSForm>
      <input
        type="checkbox"
        id="tos"
        onClick={acceptTermsOfService}
        checked={termsOfServiceAccepted}
      />
      <label htmlFor="tos">
        J&apos;ai lu et j&apos;accepte les nouvelles{' '}
        <ExternalLink>
          conditions générales d&apos;utilisation (CGU)
        </ExternalLink>
        .
      </label>
    </TOSForm>

    <OnboardinButton>Continuer</OnboardinButton>
  </Wrapper>
);
