import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';

import {
  BulleTitle,
  ButtonClose,
  ButtonMenu,
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
  Arrow,
  Close,
  Delete
} from '../../components/atoms/icons';

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

import Notification from '../../components/views/Notification';

const Sandbox = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <h2>Liste de Bulles </h2>
      <Notification>
        <Header>
          <Title>2 messages pour cette page</Title>
          <ButtonClose>
            <Close />
          </ButtonClose>
        </Header>

        <main>
          <BulleExcerpt>
            <Type>plop</Type>
            <div>
              <BulleTitle>« De nombreux clients mécontents de ce… »</BulleTitle>
              <Contributor>Le Même en Mieux</Contributor>
            </div>
            <Delete />
          </BulleExcerpt>
        </main>

        <Footer>
          <Logo>Bulles</Logo>
          <ButtonMenu>Afficher le menu</ButtonMenu>
        </Footer>
      </Notification>

      <h2>Liste avec une Bulle supprimée</h2>

      <Notification>
        <Header>
          <Title>2 messages pour cette page</Title>
          <ButtonClose>
            <Close />
          </ButtonClose>
        </Header>

        <main>
          <BulleExcerpt>
            <Type>plop</Type>
            <Title>« De nombreux clients mécontents de ce… »</Title>
            <Contributor>Le Même en Mieux</Contributor>
            <Delete />
          </BulleExcerpt>

          <BulleDeleted>
            Cette bulle ne s’affichera plus
          </BulleDeleted>
        </main>

        <Footer>
          <Logo>Bulles</Logo>
          <ButtonMenu>Afficher le menu</ButtonMenu>
        </Footer>
      </Notification>

      <h2>Détails d'une Bulle</h2>

      <Notification>
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
        </main>

        <Footer>
          <Logo>Bulles</Logo>
          <ButtonMenu>Afficher le menu</ButtonMenu>
        </Footer>
      </Notification>

      <h2>Aucune Bulle</h2>
      <Notification>
        <Header>
          <Title>Aucune de vos relations n’a créé de bulle pour cette page</Title>
          <ButtonClose>
            <Close />
          </ButtonClose>
        </Header>

        <main>
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
