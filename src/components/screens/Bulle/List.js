import React from 'react';
import { Notification, Bulle} from '../../organisms';
import {AddBulle} from '../../molecules';
import { ListBullesTitle } from '../../atoms';

const message = 'De nombreux clients mécontents de Pixmania et ses vendeurs s’expriment sur les '
    + 'réseaux sociaux depuis 2016. Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.';

export default ({ match }) => (
  <Notification>
    <ListBullesTitle>Bulles pour cette page</ListBullesTitle>
    <Bulle
      match={match}
      type="Alternative"
      message={message}
      contributor="Le Même en Mieux"
      source="http://forum.que-choisir.org/pixmania-avis-1285"
      approves={21}
      dislikes={3}
    />
    <Bulle
      match={match}
      type="Rant"
      message={message}
      contributor="Le Même en Mieux"
      source="http://forum.que-choisir.org/pixmania-avis-1285"
      approves={21}
      dislikes={3}
      deleted
    />
    <AddBulle />
  </Notification>
);
