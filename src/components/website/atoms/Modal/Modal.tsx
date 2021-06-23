import React from 'react';
import styled from 'styled-components';
import Cross from './Cross';

const StyledCross = styled(props => <Cross {...props} />)`
  pointer-events: none;
  position: absolute;
  top: 15px;
  right: 15px;
  width: 15px;
  height: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  transition: opacity ${props => props.theme.website.animationMediumDuration};
  transition-delay: ${props => props.theme.website.animationMediumDuration};
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  top: calc(100vh - 100px);
  pointer-events: none;
  ${Content} {
    opacity: 0;
  }
  &.open {
    opacity: 1;
    top: 0;
    pointer-events: auto;
    ${Content} {
      opacity: 1;
    }
  }
  transition: opacity ${props => props.theme.website.animationMediumDuration}
      ease,
    top ${props => props.theme.website.animationMediumDuration} ease;
  position: fixed;
  z-index: 9999;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(40, 85, 162, 0.95);
  background: linear-gradient(
    180deg,
    rgba(40, 85, 162, 1) 0%,
    rgba(40, 85, 162, 0.95) 100%
  );
  cursor: pointer;
`;

export interface ModalProps {
  className?: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = styled(({ className, children, open, setOpen }: ModalProps) => {
  return (
    <Background
      className={className + (open ? ' open' : '')}
      onClick={() => setOpen(false)}
    >
      <Content>{children}</Content>
      <StyledCross />
    </Background>
  );
})``;

export default Modal;
