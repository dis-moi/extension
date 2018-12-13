import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';
import theme from '../theme';
import { AddBulle } from '../../components/molecules';
import { Notification, Bulle } from '../../components/organisms';

const message = 'De nombreux clients mécontents de Pixmania et ses vendeurs s’expriment sur les '
    + 'réseaux sociaux depuis 2016. Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.';

const Sandbox = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <h2>Liste de Bulles </h2>
      <Notification
        title="Bulles"
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
        title="Bulles"
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
        title="Détails de la bulle"
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
        title="Bulles"
      >
        <AddBulle />
      </Notification>
    </Fragment>
  </ThemeProvider>
);

setConfig({ logLevel: 'debug' });

export default hot(module)(Sandbox);
