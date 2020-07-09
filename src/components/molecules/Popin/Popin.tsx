import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BackgroundButton, Box } from '../../atoms';
import CloseButton from '../../organisms/Notification/NotificationHeader/CloseButton';

export type PopinSize = 'small' | 'large';

export interface PopinState {
  opened: boolean;
}

export interface PopinProps extends PopinState {
  children?: ReactNode;
  setOpened: (opened: boolean) => void;
  size?: PopinSize;
}

const PopinWrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 34, 75, 0.6);

  @media (max-width: ${props => props.theme.tabletWidth}) {
    padding-right: 15px;
    padding-left: 15px;
  }
`;

interface PopinContentProps {
  size?: PopinSize;
}

const PopinContent = styled(Box)<PopinContentProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${props => (props.size === 'large' ? '550px' : ' 450px')};
  margin-right: auto;
  margin-left: auto;
  padding-top: 34px;
  font-size: ${props => props.theme.fontSizeDefault};
  text-align: center;
  box-shadow: 0px 3px 6px #00000029;

  ${BackgroundButton} {
    margin-top: 20px;
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    min-width: 0;
    padding-right: 30px;
    padding-left: 30px;

    ${BackgroundButton} {
      width: 100%;
    }
  }
`;

const PopinClose = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  display: block;
  width: 13px;
  height: 13px;

  & > svg {
    width: 10px;
    height: 10px;
  }

  ${CloseButton} {
    padding: 0;
  }
`;

const Popin = ({ children, opened, setOpened, size }: PopinProps) => {
  if (!opened) {
    return null;
  }

  return (
    <PopinWrapper onClick={() => setOpened(false)}>
      <PopinContent
        size={size}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <PopinClose>
          <CloseButton onClick={() => setOpened(false)} />
        </PopinClose>
        {children}
      </PopinContent>
    </PopinWrapper>
  );
};

export default Popin;
