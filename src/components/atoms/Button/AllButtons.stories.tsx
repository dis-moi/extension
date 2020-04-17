import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { Button, BorderButton /* , AddNoticeButton */ } from '../index';
import { BackgroundButton, OpenButton } from './index';
import Tab from '../Tab/Tab';
import ContributorButton from '../../organisms/Contributor/ContributorButton';
import DeleteButton from '../../organisms/Notice/DeleteButton';
import Feedbacks from '../../organisms/NoticeDetails/Feedbacks';
import ThumbUp from '../icons/ThumbUp';
import ThumbDown from '../icons/ThumbDown';
import BackButton from '../../organisms/Notification/NotificationHeader/BackButton';
import CloseButton from '../../organisms/Notification/NotificationHeader/CloseButton';
import Empty from '../../../app/options/App/Settings/SubscriptionsScreen/Empty';
import OnboardinButton from '../../../app/options/App/Onboarding/atoms/OnboardingButton';

const ButtonsListBackground = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const ButtonsListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  & > div {
    display: flex;
    justify-content: center;
    padding: 5px;
    border: 1px solid black;
  }
`;

const OnboardingBottomLineButton = styled(OnboardinButton)`
  text-transform: none;
  font-weight: normal;
  font-size: 20px;
  margin: 0 auto;
`;

const OnboardingBottomLineSecondaryButton = styled(OnboardingBottomLineButton)`
  background-color: ${props => props.theme.button};
  border-color: ${props => props.theme.button};

  &:hover {
    background-color: ${props => props.theme.backgroundButton.hover};
    border-color: ${props => props.theme.backgroundButton.hover};
  }
`;

const ButtonsList = () => {
  return (
    <ButtonsListBackground>
      <h1>Liste de tous les boutons</h1>
      <h2>Dans les atoms</h2>
      <ButtonsListWrapper>
        <div>
          <Button>Bouton de base</Button>
        </div>
      </ButtonsListWrapper>

      <ButtonsListWrapper>
        <div>
          <BorderButton>Border Button</BorderButton>
        </div>
        <div>
          <BorderButton disabled={true}>Border Button</BorderButton>
        </div>
        <div>
          <BorderButton loading>Border Button</BorderButton>
        </div>
        <div>
          <BorderButton disabled={true} loading>
            Border Button
          </BorderButton>
        </div>
      </ButtonsListWrapper>

      <ButtonsListWrapper>
        <div>
          <BackgroundButton>Background Button</BackgroundButton>
        </div>
        <div>
          <BackgroundButton disabled={true}>
            Background disabled Button
          </BackgroundButton>
        </div>
        <div>
          <BackgroundButton loading>Background Button</BackgroundButton>
        </div>
        <div>
          <BackgroundButton loading disabled={true}>
            Background Button
          </BackgroundButton>
        </div>
      </ButtonsListWrapper>

      <ButtonsListWrapper>
        <div>
          <OpenButton />
        </div>

        <div>Need help on AddNoticeButton</div>
      </ButtonsListWrapper>

      <ButtonsListWrapper>
        <div>
          <Tab>Mes abonnements</Tab>
        </div>

        <div>
          <Tab active>Mes abonnements</Tab>
        </div>
      </ButtonsListWrapper>

      <h2>Contributor</h2>
      <ButtonsListWrapper>
        <div>
          <ContributorButton subscribed={true} />
        </div>
        <div>
          <ContributorButton subscribed={false} />
        </div>
      </ButtonsListWrapper>
      <h2>Notice</h2>
      <ButtonsListWrapper>
        <div>
          <DeleteButton />
        </div>

        <div>
          <Feedbacks>
            <Button>
              <ThumbUp />
            </Button>
            <Button>
              <ThumbDown />
            </Button>
          </Feedbacks>
        </div>

        <div>
          <Feedbacks>
            <Button>
              <ThumbUp filled={true} />
            </Button>
            <Button>
              <ThumbDown filled={true} />
            </Button>
          </Feedbacks>
        </div>
      </ButtonsListWrapper>
      <h2>Notification</h2>
      <h3>Header</h3>
      <ButtonsListWrapper>
        <div>
          <BackButton />
        </div>

        <div>
          <CloseButton />
        </div>
      </ButtonsListWrapper>
      <h3>Footer</h3>
      <ButtonsListWrapper>
        <div>Need help here too</div>
      </ButtonsListWrapper>
      <h2>Subscription screen empty</h2>
      <Empty />
      <h2>Onboarding</h2>
      <ButtonsListWrapper>
        <div>
          <OnboardinButton>Continuer</OnboardinButton>
        </div>
        <div>
          <OnboardinButton disabled={true}>Continuer</OnboardinButton>
        </div>
      </ButtonsListWrapper>
      <h2>Onboarding - bottom bar</h2>
      <ButtonsListWrapper>
        <div>
          <OnboardingBottomLineButton>Continuer</OnboardingBottomLineButton>
        </div>
        <div>
          <OnboardingBottomLineSecondaryButton>
            Continuer
          </OnboardingBottomLineSecondaryButton>
        </div>
      </ButtonsListWrapper>
    </ButtonsListBackground>
  );
};

storiesOf('theme', module).add('buttons', () => <ButtonsList />);
