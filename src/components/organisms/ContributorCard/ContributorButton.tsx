import React from 'react';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';
import BorderButton from 'components/atoms/Button/BorderButton/BorderButton';

interface Props {
  followed?: boolean;
}
const ContributorButton = ({ followed }: Props) =>
  followed ? (
    <BackgroundButton>Abonné</BackgroundButton>
  ) : (
    <BorderButton>Suivre</BorderButton>
  );

export default ContributorButton;
