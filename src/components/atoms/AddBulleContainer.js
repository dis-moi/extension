import React from 'react';
import styled from 'styled-components';
import BulleContainer from './BulleContainer';
import AddBulleContent from '../molecules/AddBulle';


export const AddBulleContainer = styled(BulleContainer)``;

export default ({ children }) => (
  <AddBulleContainer>
    <AddBulleContent />
  </AddBulleContainer>
);