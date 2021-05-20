import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { BackgroundButton, Button, Paragraph, Title2 } from 'components/atoms';
import { Play } from 'components/atoms/icons';
import SidebarBox from './SidebarBox';
import Popin from '../Popin/Popin';
import VideoWrapper from '../Popin/PopinVideo';
import { StatefulContributor } from 'app/lmem/contributor';

export interface ExplainingVideoMessageBoxProps {
  contributor: StatefulContributor;
}

const VideoLink = styled(Button)`
  display: flex;
  align-items: center;
  margin-top: 16px !important;
  padding: 0;
  font-weight: normal;
  text-align: left;
  text-decoration: none;
  color: ${props => props.theme.activeColor};
`;

const VideoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.activeColor};

  & > svg {
    width: 12px;
    height: auto;
    fill: ${props => props.theme.activeColor};
  }
`;

const AddButton = styled(BackgroundButton)`
  margin-top: 16px !important;
  width: 100%;
`;

const ExplainingVideoMessageBox = ({
  contributor
}: ExplainingVideoMessageBoxProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Title2 as="h3">Ajouter DisMoi et suivre {contributor.name}</Title2>

      <SidebarBox>
        <Paragraph>
          Recevoir les alertes et conseils de {contributor.name} directement sur
          les pages web que je visite.
        </Paragraph>

        <AddButton>Ajouter DisMoi à mon navigateur</AddButton>
      </SidebarBox>

      <Title2 as="h3">C&apos;est quoi DisMoi ?</Title2>

      <SidebarBox>
        <Paragraph>
          DisMoi est le 1er réseau social qui vous accompagne sur le web : Les
          contributeurs de DisMoi postent des conseils et éclairages directement
          sur les pages web que vous visitez.
        </Paragraph>

        <VideoLink onClick={() => setOpen(true)}>
          <VideoIcon>
            <Play />
          </VideoIcon>
          Découvrir comment DisMoi fonctionne en vidéo
        </VideoLink>
      </SidebarBox>

      <Popin setOpened={setOpen} opened={open} size={'extralarge'}>
        <VideoWrapper>
          <iframe
            title="DisMoi - Comment ça marche ? www.dismoi.io"
            src="https://www.youtube.com/embed/y5_qCUhID4Y?feature=oembed"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            id="fitvid0"
          ></iframe>
        </VideoWrapper>
      </Popin>
    </>
  );
};

export default ExplainingVideoMessageBox;
