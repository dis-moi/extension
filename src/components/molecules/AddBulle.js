import React from 'react';
import { AddBulleLink, BulleContainer, } from '../atoms';
import { Arrow, Bubble } from '../atoms/icons';

export default () => (
  <BulleContainer>
    <AddBulleLink>
      <Bubble />
      <span>Ajouter une bulle</span>
      <Arrow />
    </AddBulleLink>
  </BulleContainer>
);
