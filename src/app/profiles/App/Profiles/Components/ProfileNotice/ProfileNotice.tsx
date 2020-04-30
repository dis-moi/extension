import React from 'react';
import styled from 'styled-components';
import { BorderButton, Box, Paragraph } from 'components/atoms';

const NoticeTopLine = styled.div`
  margin-bottom: ${props => props.theme.fontSizeDefault};
`;

const NoticeHighlight = styled.strong``;

const NoticeBottomLine = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${props => props.theme.fontSizeDefault};

  & > ${BorderButton} {
    margin-left: 20px;
  }
`;

export const ProfileNotice = () => {
  return (
    <Box>
      <NoticeTopLine>
        <NoticeHighlight>
          Message épinglé sur blabla.fr/sdsqdfdsf…
        </NoticeHighlight>{' '}
        et d&apos;autres pages web
      </NoticeTopLine>
      <Paragraph>
        Nous avons utilisé GrooveHQ de 2015 à 2017 en support à nos utilisateurs
        grand public. Excédés par les manquements répétés du service, nous
        l&apos;avons résilié. <a href="yolo.fr">En savoir plus</a>
      </Paragraph>
      <NoticeBottomLine>
        Visible depuis le 01/02/20
        <BorderButton>Voir en context</BorderButton>
      </NoticeBottomLine>
    </Box>
  );
};

export default ProfileNotice;
