import React, { MouseEvent } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Popin, {
  PopinProps,
  PopinState
} from 'components/molecules/Popin/Popin';
import PopinParagraph from 'components/molecules/Popin/PopinParagraph';
import { BackgroundButton, Box, ExternalLink } from 'components/atoms';
import { StatefulContributor } from 'app/lmem/contributor';
import PopinBottomBar from 'components/molecules/Popin/PopinBottomBar';
import PopinSmallText from 'components/molecules/Popin/PopinSmallText';
import { WEBSITE_DOMAIN } from 'app/lmem';

const PopinLarge = styled(Popin)`
  ${Box} {
    max-width: 720px;
  }
`;

const Text = styled(PopinParagraph)`
  display: block;
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
}

const NotConnectedPopin = ({
  opened,
  setOpened,
  contributor,
  addToBrowser
}: NotConnectedPopinProps) => {
  const { t } = useTranslation();
  return (
    <PopinLarge size={'extralarge'} opened={opened} setOpened={setOpened}>
      <Text>
        {t('profiles:popin.not_connected.title', {
          contributorName: contributor?.name,
          context: contributor?.name && 'name'
        })}
      </Text>
      <BackgroundButton className="bulle-installer" onClick={addToBrowser}>
        {t('profiles:action.add_dismoi_to_browser')}
      </BackgroundButton>
      <PopinSmallText>
        <Trans i18nKey={'profiles:popin.not_connected.message'}>
          Gratuit, sans publicité,{' '}
          <Link href={`https://${WEBSITE_DOMAIN}/vie-privee`}>
            respecte votre vie privée
          </Link>
        </Trans>
      </PopinSmallText>
      <PopinBottomBar />
    </PopinLarge>
  );
};

export default NotConnectedPopin;
