import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import { Button, BorderButton /* , AddNoticeButton */ } from '../index';
import { BackgroundButton, OpenButton } from './index';

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

        <div>
          <BorderButton>Border Button</BorderButton>
        </div>

        <div>
          <BackgroundButton>Background Button</BackgroundButton>
        </div>

        <div>
          <OpenButton />
        </div>

        <div>Need help on AddNoticeButton</div>
      </ButtonsListWrapper>
    </ButtonsListBackground>
  );
};

storiesOf('theme', module).add('buttons', () => <ButtonsList />);
