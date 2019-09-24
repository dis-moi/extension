import React, { useState } from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';
import Logo from 'components/atoms/icons/Logo';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import Title from '../OnboardingAtoms/OnboardingTitle';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardinButton from '../OnboardingAtoms/OnboardingButton';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';
import TOSAlreadyAccepted from './TOSAlreadyAccepted';
import TOSText from './TOSText';
import TOSCheckbox from './TOSCheckbox';

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

interface TosProps {
  updatedFromLmem: boolean;
  termsOfServiceAccepted: boolean;
  onContinue: () => void;
}

export default ({
  updatedFromLmem,
  termsOfServiceAccepted,
  onContinue
}: TosProps) => {
  const [acceptTosChecked, setTosChecked] = useState(false);

  return (
    <Wrapper>
      {updatedFromLmem ? (
        <>
          <LMEMToBulles />

          <TOSText>
            A partir d’aujourd’hui, vous pouvez vous abonner à des amis, media
            et experts de votre choix.
            <br />
            Vous recevrez leurs messages en fonction de la page web que vous
            visitez, comme pour Le Même en Mieux.
          </TOSText>

          <TOSText>
            Cette évolution entraîne un changement de nom : l’extension
            s’appelle désormais Bulles.
          </TOSText>

          <TOSText>
            Nous avons également renforcé la protection de votre vie privée{' '}
            <ExternalLink href="https://www.bulles.fr/vie-privee">
              protection de votre vie privée
            </ExternalLink>
          </TOSText>
          <TOSText>
            <ExternalLink href="https://www.bulles.fr/evolutions">
              Voir toutes les nouveautés
            </ExternalLink>
          </TOSText>
        </>
      ) : (
        <>
          <Intro>
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
              <strong>Liberté d’information</strong> : Vous recevez
              l’information que vous avez choisie.
            </TOSListItem>
            <TOSListItem>
              <strong>Pas de publicité</strong>
            </TOSListItem>
            <TOSListItem>
              <strong>
                Anonymat: Pas d’email ni de compte nécessaires pour naviguer
                avec Bulles
              </strong>
            </TOSListItem>
            <TOSListItem>
              <strong>Seules des données strictement utiles</strong> au
              fonctionnement du service sont collectées
            </TOSListItem>
            <TOSListItem>
              <strong>Aucune revente ni divulgation de données</strong>
            </TOSListItem>
          </TOSList>

          <TOSText>
            Ces principes ne se substituent pas à la lecture détaillée des
            Conditions Générales d’utilisation que vous devez accepter
            (ci-dessous) pour naviguer avec Bulles.
          </TOSText>

          <TOSTitle>Conditions générales d’utilisation</TOSTitle>
        </>
      )}

      {termsOfServiceAccepted ? (
        <TOSAlreadyAccepted />
      ) : (
        <TOSCheckbox onChange={setTosChecked} checked={acceptTosChecked} />
      )}

      <OnboardinButton
        disabled={!acceptTosChecked && !termsOfServiceAccepted}
        onClick={onContinue}
      >
        Continuer
      </OnboardinButton>
    </Wrapper>
  );
};
