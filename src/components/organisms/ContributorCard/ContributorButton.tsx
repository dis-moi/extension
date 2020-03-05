import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';

const FollowButton = styled(BorderButton)`
  text-transform: none;
`;

interface Props {
  subscribed?: boolean;
}

const ContributorButton = ({ subscribed }: Props) =>
  subscribed ? (
    <BackgroundButton>Suivi(e)</BackgroundButton>
  ) : (
    <FollowButton>Suivre</FollowButton>
  );

export default ContributorButton;
