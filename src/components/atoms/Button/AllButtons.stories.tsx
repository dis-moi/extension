import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button, BorderButton, ButtonWithIcon } from '../';
import AddNoticeButton from './AddNoticeButton';
import { BackgroundButton, OpenButton } from './index';
import Tab from '../Tab/Tab';
import ContributorButton from 'components/organisms/Contributor/ContributorButton';
import DeleteButton from 'components/organisms/Notice/DeleteButton';
import Feedbacks from 'components/organisms/NoticeDetails/Feedbacks';
import { ThumbUp, ThumbDown } from 'components/atoms/icons';
import BackButton from 'components/organisms/Notification/NotificationHeader/BackButton';
import CloseButton from 'components/organisms/Notification/NotificationHeader/CloseButton';
import NavLink from 'components/organisms/Notification/NotificationFooter/NavLink';
import { MemoryRouter as Router } from 'react-router';
import Download from '../icons/Download';

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
        <div>
          <ButtonWithIcon>
            Ajouter à mon navigateur <Download />
          </ButtonWithIcon>
        </div>

        <div>
          <AddNoticeButton />
        </div>
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
          <ContributorButton
            subscribed={true}
            onSubscribe={action('subscribe')}
            onUnsubscribe={action('unsubscribe')}
          />
        </div>
        <div>
          <ContributorButton
            subscribed={false}
            onSubscribe={action('subscribe')}
            onUnsubscribe={action('unsubscribe')}
          />
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
        <div>
          <NavLink to={'/url'}>Contributions</NavLink>
        </div>
        <div>
          <NavLink to={'/url'} className="active">
            Contributions
          </NavLink>
        </div>
      </ButtonsListWrapper>
    </ButtonsListBackground>
  );
};

storiesOf('Theme', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Buttons', () => <ButtonsList />);
