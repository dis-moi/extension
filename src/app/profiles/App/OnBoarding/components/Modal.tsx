import React from 'react';
import styled from 'styled-components';
import CloseButton from '../../../../../components/organisms/Notification/NotificationHeader/CloseButton';
import { PopinClose } from 'components/molecules/Popin/Popin';
import { CloseFunction } from '../index';
import useNoScrollBody from 'app/utils/useNoScrollBody';

interface ContainerProps {
  open: boolean;
}

interface ModalProps extends ContainerProps {
  children: React.ReactElement;
  close: CloseFunction;
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  height: 100vh;
  width: 100%;
  background: rgba(255, 255, 255, 0.65);
  display: ${props => (props.open ? 'block' : 'none')};
`;

export default ({ children, open, close }: ModalProps) => {
  useNoScrollBody();

  return (
    <Container open={open}>
      <PopinClose>
        <CloseButton onClick={close} />
      </PopinClose>
      {children}
    </Container>
  );
};
