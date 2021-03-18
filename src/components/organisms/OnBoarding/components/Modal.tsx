import React from 'react';
import styled from 'styled-components';
import CloseButton from '../../Notification/NotificationHeader/CloseButton';
import { PopinClose } from '../../../molecules/Popin/Popin';
import { BackgroundButton } from '../../../atoms';
import { CloseFunction } from '../index';

interface ContainerProps {
  open: boolean;
}

interface ModalProps extends ContainerProps {
  children: React.ReactElement;
  close: CloseFunction;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  display: ${props => (props.open ? 'block' : 'none')};
`;

export default ({ children, open, close }: ModalProps) => {
  return (
    <Container open={open}>
      <PopinClose>
        <CloseButton onClick={close} />
      </PopinClose>
      {children}
      <BackgroundButton onClick={close}>
        Fermer la démonstration
      </BackgroundButton>
    </Container>
  );
};
