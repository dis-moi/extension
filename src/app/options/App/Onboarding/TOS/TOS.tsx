import React, { useState } from 'react';
import styled from 'styled-components';
import LogoDismoi from 'components/atoms/LogoDismoi';
import Wrapper from '../atoms/OnboardingWrapper';
import Intro from '../atoms/OnboardingIntro';
import SubTitle from '../atoms/OnboardingSubTitle';
import OnboardingButton from '../atoms/OnboardingButton';
import TOSAlreadyAccepted from './TOSAlreadyAccepted';
import TOSText from './TOSText';
import TOSCheckbox from './TOSCheckbox';

const Title = styled(SubTitle)`
  margin-top: 32px;
  margin-bottom: 0;
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
  termsOfServiceAccepted?: boolean;
  onContinue: () => void;
}

export default ({ termsOfServiceAccepted, onContinue }: TosProps) => {
  const [acceptTosChecked, setTosChecked] = useState(false);

  return (
    <Wrapper>
      <Intro>
        <LogoDismoi />

        <Title>
          Pour naviguer avec Dismoi, veuillez lire et accepter <br />
          les conditions générales d’utilisation.
        </Title>
      </Intro>

      <TOSTitle>Nos engagements</TOSTitle>

      <TOSList>
        <TOSListItem>
          <strong>Pas de publicité</strong>
        </TOSListItem>
        <TOSListItem>
          <strong>Anonymat:</strong> Pas d’email ni de compte nécessaires pour
          naviguer avec Dismoi
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
        Conditions Générales d’utilisation que vous devez accepter (ci-dessous)
        pour naviguer avec Dismoi.
      </TOSText>

      <TOSTitle>Conditions générales d’utilisation</TOSTitle>

      {termsOfServiceAccepted !== undefined &&
        (termsOfServiceAccepted ? (
          <TOSAlreadyAccepted />
        ) : (
          <TOSCheckbox onChange={setTosChecked} checked={acceptTosChecked} />
        ))}

      <OnboardingButton
        disabled={!acceptTosChecked && !termsOfServiceAccepted}
        onClick={onContinue}
      >
        Continuer
      </OnboardingButton>
    </Wrapper>
  );
};
