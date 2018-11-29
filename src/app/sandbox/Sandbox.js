import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';
import { AddBulleContainer } from '../../components/atoms';
import { Notification, Bulle } from '../../components/organisms';

const message = 'De nombreux clients mécontents de Pixmania et ses vendeurs s’expriment sur les '
    + 'réseaux sociaux depuis 2016. Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.';

const type = 'warningFav';

const Sandbox = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <h2>Liste de Bulles </h2>
      <Notification
        title="2 messages pour cette page"
      >
        <Bulle
          message={message}
          contributor="Le Même en Mieux"
          source="http://forum.que-choisir.org/pixmania-avis-1285"
          approves={21}
          dislikes={3}
        />
        <Bulle
          type="Fav"
          message={message}
          contributor="Le Même en Mieux"
          source="http://forum.que-choisir.org/pixmania-avis-1285"
          approves={21}
          dislikes={3}
        />
      </Notification>

      <h2>Liste avec une Bulle supprimée</h2>
      <Notification
        title="2 messages pour cette page"
      >
        <Bulle
          type="Alternative"
          message={message}
          contributor="Le Même en Mieux"
          source="http://forum.que-choisir.org/pixmania-avis-1285"
          approves={21}
          dislikes={3}
        />
        <Bulle
          type="Rant"
          message={message}
          contributor="Le Même en Mieux"
          source="http://forum.que-choisir.org/pixmania-avis-1285"
          approves={21}
          dislikes={3}
          deleted
        />
      </Notification>

      <h2>Détails d'une Bulle</h2>
      <Notification
        title="Le Même en Mieux, il y a 8 mois"
        details
      >
        <Bulle
          type="NeedHelp"
          message={message}
          contributor="Le Même en Mieux"
          source="http://forum.que-choisir.org/pixmania-avis-1285"
          approves={21}
          dislikes={3}
        />
      </Notification>

      <h2>Aucune Bulle</h2>
      <Notification
        title="Aucune de vos relations n’a créé de bulle pour cette page"
      >
        <AddBulleContainer />
      </Notification>
    </Fragment>
  </ThemeProvider>
);

setConfig({ logLevel: 'debug' });

export default hot(module)(Sandbox);
