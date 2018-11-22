import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';

import ButtonClose from '../../components/atoms/ButtonClose';
import ButtonMenu from '../../components/atoms/ButtonMenu';
import ButtonDelete from '../../components/atoms/ButtonDelete';
import Logo from '../../components/atoms/Logo';
import Title from '../../components/atoms/Title';
import Type from '../../components/atoms/Type';
import Message from '../../components/atoms/Message';
import SourceURL from '../../components/atoms/SourceURL';
import Approves from '../../components/atoms/Approves';
import Dislikes from '../../components/atoms/Dislikes';
import Contributor from '../../components/atoms/Contributor';

import Close from '../../components/atoms/icons/Close';
import Arrow from '../../components/atoms/icons/Arrow';

import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import Feedbacks from '../../components/molecules/Feedbacks';

import BulleDetails from '../../components/organisms/BulleDetails';
import BulleExcerpt from '../../components/organisms/BulleExcerpt';
import BulleDeleted from '../../components/organisms/BulleDeleted';
import BulleToAdd from '../../components/organisms/BulleToAdd';

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
