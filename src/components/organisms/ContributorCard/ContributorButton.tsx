import React from 'react';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';

interface Props {
  subscribed?: boolean;
}
const ContributorButton = ({ subscribed }: Props) =>
  subscribed ? (
    <BackgroundButton>Suivi·e</BackgroundButton>
  ) : (
    <BorderButton>Suivre</BorderButton>
  );

export default ContributorButton;
