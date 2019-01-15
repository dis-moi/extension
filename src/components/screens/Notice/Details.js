import React from 'react';
import {NoticeDetails, Notification} from '../../organisms';

const message = 'L’économie est (vraiment) un sport de combat : “La boule puante de MM. Cahuc et Zylberberg ' 
    + 'contre le “négationnisme” des économistes critiques le confirme : le combat idéologique '
    + 'tombe parfois dans le caniveau. Depuis vingt ans pourtant, s’est construit en France une ' 
    + 'contre-expertise économique crédible qui veut fournir aux dominés des outils pour penser '
    + '(et résister à) la pseudo”';


export default () => (
  <Notification title="Détail de la notice" notices>
    <NoticeDetails
      type="Tip"
      date="03 déc. 2018"
      message={message}
      contributor="Le Même en Mieux"
      source="http://forum.que-choisir.org/pixmania-avis-1285"
      approves={21}
      dislikes={3}
      details
    />
  </Notification>
);
