import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button, Paragraph, Title2 } from 'components/atoms';
import { Play } from 'components/atoms/icons';
import SidebarBox from './SidebarBox';
import ContributionExample from 'assets/img/contributors/contribution-example.jpg';

const VideoLink = styled(Button)`
  position: relative;
  margin-top: 16px !important;
  font-weight: normal;
  text-align: center;

  &,
  &:hover {
    color: #fff;
  }

  & > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    font-size: 16px;
    background-color: rgba(12, 82, 180, 0.95);
    border-radius: 5px;
    overflow: hidden;
  }

  img {
    max-width: 100%;
  }
`;

const VideoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-top: 16px;
  background-color: #fff;
  border-radius: 50%;

  & > svg {
    width: 16px;
    height: auto;
    fill: ${props => props.theme.activeColor};
  }
`;

export default () => {
  const { t } = useTranslation();
  return (
    <SidebarBox>
      <Title2 as="h3">C’est quoi DisMoi ?</Title2>

      <Paragraph>
        DisMoi est le 1er réseau social qui vous accompagne sur le web : les
        contributeurs de DisMoi postent des conseils et éclairages directement
        sur les pages web que vous visitez.
      </Paragraph>

      <VideoLink>
        <img src={ContributionExample} alt="" />

        <div>
          Découvrir comment DisMoi fonctionne en vidéo
          <VideoIcon>
            <Play />
          </VideoIcon>
        </div>
      </VideoLink>
    </SidebarBox>
  );
};
