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
  background: rgba(255, 255, 255, 0.9);
  display: ${props => (props.open ? 'block' : 'none')};
  padding: 1em;
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
