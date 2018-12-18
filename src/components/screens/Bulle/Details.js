import React from 'react';
import {Bulle, Notification} from '../../organisms';

const message = 'De nombreux clients mécontents de Pixmania et ses vendeurs s’expriment sur les '
    + 'réseaux sociaux depuis 2016. Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.';


export default () => (
  <Notification title="Details d'une bulle">
    <Bulle
      type="Alternative"
      message={message}
      contributor="Le Même en Mieux"
      source="http://forum.que-choisir.org/pixmania-avis-1285"
      approves={21}
      dislikes={3}
      details
    />
  </Notification>
);
