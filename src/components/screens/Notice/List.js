import React from 'react';
import { NotificationContentTitle } from '../../atoms';
import { AddNotice} from '../../molecules';
import { Notification, Notice} from '../../organisms';

const message = 'De nombreux clients mécontents de Pixmania et ses vendeurs s’expriment sur les '
    + 'réseaux sociaux depuis 2016. Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.';

export default ({ match }) => {
  return (
    <Notification notices>
      <NotificationContentTitle>Notices pour cette page</NotificationContentTitle>
      <Notice
        match={match}
        type="Tip"
        message={message}
        contributor="Le Même en Mieux"
        source="http://forum.que-choisir.org/pixmania-avis-1285"
        approves={21}
        dislikes={3}
      />
      <Notice
        match={match}
        type="Rant"
        message={message}
        contributor="Le Même en Mieux"
        source="http://forum.que-choisir.org/pixmania-avis-1285"
        approves={21}
        dislikes={3}
        deleted
      />
      <AddNotice />
    </Notification>
  );
};
