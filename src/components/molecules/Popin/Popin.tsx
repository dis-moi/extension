import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BackgroundButton, Box } from '../../atoms';
import CloseButton from '../../organisms/Notification/NotificationHeader/CloseButton';

const PopinWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: rgba(5, 34, 75, 0.6);
`;

const PopinContent = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 450px;
  max-width: 550px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 34px;
  font-size: ${props => props.theme.fontSizeDefault};
  text-align: center;
  box-shadow: 0px 3px 6px #00000029;

  ${BackgroundButton} {
    margin-top: 20px;
  }
`;

const PopinClose = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

interface PopinProps {
  children: ReactNode;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const Popin = ({ children, opened, setOpened }: PopinProps) => {
  if (!opened) {
    return null;
  }

  return (
    <PopinWrapper>
      <PopinContent>
        <PopinClose>
          <CloseButton onClick={() => setOpened(false)} />
        </PopinClose>
        {children}
      </PopinContent>
    </PopinWrapper>
  );
};

export default Popin;
