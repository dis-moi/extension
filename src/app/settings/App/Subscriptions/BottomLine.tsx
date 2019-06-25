import React from 'react';
import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton/BackgroundButton';

const BottomLineBg = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  padding-top: 30px;
  text-align: center;
  background-color: #fafafa;
`;

const InfoLine = styled.p`
  margin: 0 0 16px;
  font-size: 17px;
  font-weight: bold;
  color: #ba1b1b;
`;

const Button = styled(BackgroundButton)`
  padding: 15px 35px;
  height: auto;
  font-size: 24px;
`;

const BottomLine = () => (
  <>
    <BottomLineBg>
      <InfoLine>Choisir au minimum 1 contributeur</InfoLine>
      <Button disabled>Terminer</Button>
    </BottomLineBg>
  </>
);

export default BottomLine;
