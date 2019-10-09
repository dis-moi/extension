import React, { useState } from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';
import LogoBeta from 'components/atoms/LogoBeta';
import Wrapper from '../OnboardingAtoms/OnboardingWrapper';
import Intro from '../OnboardingAtoms/OnboardingIntro';
import SubTitle from '../OnboardingAtoms/OnboardingSubTitle';
import OnboardinButton from '../OnboardingAtoms/OnboardingButton';
import LMEMToBulles from '../OnboardingAtoms/LMEMToBulles';
import TOSAlreadyAccepted from './TOSAlreadyAccepted';
import TOSText from './TOSText';
import TOSCheckbox from './TOSCheckbox';
import OnboardingSteps from '../OnboardingAtoms/OnboardingSteps/OnboardingSteps';

const Title = styled(SubTitle)`
  margin-top: 32px;
  margin-bottom: 0;
`;

const TitleLMEM = styled(Title)`
  color: ${props => props.theme.activeColor};
`;

const TOSTitle = styled.h3`
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`;

const TOSList = styled.ol`
  margin-bottom: 16px;
  padding-left: 0;
  counter-reset: TOS;
  list-style-type: none;
`;

const TOSListItem = styled.li`
  margin-bottom: 6px;
  font-size: 16px;

  &:before {
    content: counter(TOS) '.';
    counter-increment: TOS;
    margin-right: 12px;
    font-weight: bold;
    font-size: 18px;
  }
`;

interface TosProps {
  updatedFromLmem: boolean;
  termsOfServiceAccepted?: boolean;
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
          <Intro>
            <LMEMToBulles />

            <TitleLMEM>
              Votre extension s&apos;ouvre à de nouveaux contributeurs
              <br /> et change de nom.
            </TitleLMEM>
          </Intro>

          <OnboardingSteps activeStep={1} />

          <TOSText>Votre extension navigateur évolue.</TOSText>

          <TOSText>
            Le principe reste le même : vous recevez des messages en fonction de
            la page web que vous visitez.
          </TOSText>

          <TOSText>
            <strong>
              Nouveauté&nbsp;:&nbsp;vous pouvez vous abonner aux amis, media et
              experts que vous voulez,
            </strong>{' '}
            en plus du guide Le Même en Mieux.
          </TOSText>

          <TOSText>
            Cette évolution entraîne un changement de nom : l’extension
            s’appelle désormais Bulles.
          </TOSText>

          <TOSText>
            Nous avons également renforcé la{' '}
            <ExternalLink href="https://www.bulles.fr/vie-privee">
              protection de votre vie privée.
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
            <LogoBeta />

            <Title>
              Pour finaliser l’installation, veuillez lire et accepter <br />
              les conditions générales d’utilisation.
            </Title>
          </Intro>

          <TOSTitle>Nos engagements</TOSTitle>

          <TOSList>
            <TOSListItem>
              <strong>Liberté d’information</strong> : Vous recevez
              l’information que vous avez choisie.
            </TOSListItem>
            <TOSListItem>
              <strong>Pas de publicité</strong>
            </TOSListItem>
            <TOSListItem>
              <strong>Anonymat:</strong> Pas d’email ni de compte nécessaires
              pour naviguer avec Bulles
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
            Ces engagements ne se substituent pas à la lecture détaillée des
            Conditions Générales d’utilisation que vous devez accepter
            (ci-dessous) pour naviguer avec Bulles.
          </TOSText>

          <TOSTitle>Conditions générales d’utilisation</TOSTitle>
        </>
      )}

      {termsOfServiceAccepted !== undefined &&
        (termsOfServiceAccepted ? (
          <TOSAlreadyAccepted />
        ) : (
          <TOSCheckbox onChange={setTosChecked} checked={acceptTosChecked} />
        ))}

      <OnboardinButton
        disabled={!acceptTosChecked && !termsOfServiceAccepted}
        onClick={onContinue}
      >
        Continuer
      </OnboardinButton>
    </Wrapper>
  );
};
