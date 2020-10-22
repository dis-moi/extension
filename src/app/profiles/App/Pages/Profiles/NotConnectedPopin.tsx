import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import Popin, {
  PopinProps,
  PopinState
} from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { BackgroundButton, Box, ExternalLink } from 'components/atoms';
import { Contributor, StatefulContributor } from 'app/lmem/contributor';
import PopinBottomBar from 'components/molecules/Popin/PopinBottomBar';
import PopinSmallText from 'components/molecules/Popin/PopinSmallText';
import { WEBSITE_DOMAIN } from 'app/lmem';

const PopinLarge = styled(Popin)`
  ${Box} {
    max-width: 720px;
  }
`;

const Text = styled(PopinParagraph)`
  text-align: center;
`;

const Link = styled(ExternalLink)`
  color: ${props => props.theme.text};
  font-weight: normal;
  text-decoration: underline;
`;

export interface NotConnectedPopinState extends PopinState {
  contributor?: StatefulContributor;
}

interface NotConnectedPopinProps extends PopinProps {
  contributor?: StatefulContributor;
  addToBrowser: (e: MouseEvent<HTMLButtonElement>) => void;
  contributors: StatefulContributor[];
  onContributorClick: (contributor: Contributor) => void;
}

const NotConnectedPopin = ({
  opened,
  setOpened,
  contributor,
  addToBrowser,
  onContributorClick
}: NotConnectedPopinProps) => {
  const handleContributorClicked = (contributor: Contributor) => {
    onContributorClick(contributor);
    setOpened(false);
  };

  return (
    <PopinLarge opened={opened} setOpened={setOpened}>
      <Text>
        Pour voir les contributions {contributor && `de ${contributor.name}`},
        veuillez d’abord ajouter Dismoi à votre navigateur.
      </Text>

      <BackgroundButton className="bulle-installer" onClick={addToBrowser}>
        Ajouter Dismoi à mon navigateur
      </BackgroundButton>
      <PopinSmallText>
        Gratuit, sans publicité,{' '}
        <Link href={`https://${WEBSITE_DOMAIN}/vie-privee`}>
          respecte votre vie privée
        </Link>
      </PopinSmallText>
      <PopinBottomBar />
    </PopinLarge>
  );
};

export default NotConnectedPopin;
