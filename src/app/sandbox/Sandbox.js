import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';

import { 
  ButtonClose, 
  ButtonMenu, 
  ButtonDelete, 
  Logo, 
  Title, 
  Type, 
  Message, 
  SourceURL, 
  Approves, 
  Dislikes, 
  Contributor 
} from '../../components/atoms';

import {
  BulleDeleted,
  BulleDetails,
  BulleExcerpt,
  BulleToAdd
} from '../../components/organisms';

import {
  Feedbacks,
  Footer,
  Header,
} from '../../components/molecules';

import Close from '../../components/atoms/icons/Close';
import Arrow from '../../components/atoms/icons/Arrow';

import Notification from '../../components/views/Notification';

const Sandbox = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Notification>
        <Header>
          <Title>2 messages pour cette page</Title>
          <ButtonClose>
            <Close />
          </ButtonClose>
        </Header>
        <Header>
          <Title>
            <Arrow />
            &nbsp;
            Le Même en Mieux, il y a 8 mois
          </Title>
          <ButtonClose>
            <Close />
          </ButtonClose>
        </Header>
        <Header>
          <Title>Aucune de vos relations n’a créé de bulle pour cette page</Title>
          <ButtonClose>
            <Close />
          </ButtonClose>
        </Header>

        <main>
          <BulleDetails>
            <Type>plop</Type>
            <Message>
              De nombreux clients mécontents de 
              Pixmania et ses vendeurs s’expriment sur les réseaux sociaux depuis 2016. 
              Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.
            </Message>

            <SourceURL>http://forum.que-choisir.org/pixmania-avis-1285</SourceURL>

            <Feedbacks>
              <Approves>21</Approves>
              <Dislikes>3</Dislikes>
            </Feedbacks>
          </BulleDetails>

          <BulleExcerpt>
            <Type>plop</Type>
            <Title>« De nombreux clients mécontents de ce… »</Title>
            <Contributor>Le Même en Mieux</Contributor>
            <ButtonDelete />
          </BulleExcerpt>

          <BulleDeleted>
            Cette bulle ne s’affichera plus
          </BulleDeleted>

          <BulleToAdd>
            Ajouter une bulle
          </BulleToAdd>
        </main>

        <Footer>
          <Logo>Bulles</Logo>
          <ButtonMenu>Afficher le menu</ButtonMenu>
        </Footer>
      </Notification>
    </Fragment>
  </ThemeProvider>
);

setConfig({ logLevel: 'debug' });

export default hot(module)(Sandbox);
