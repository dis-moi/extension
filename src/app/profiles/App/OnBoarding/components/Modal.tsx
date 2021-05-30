import React from 'react';
import styled from 'styled-components';
import { PopinClose } from 'components/molecules/Popin/Popin';
import useNoScrollBody from 'libs/utils/useNoScrollBody';
import CloseButton from '../../../../../components/organisms/Notification/NotificationHeader/CloseButton';
import { CloseFunction } from '../OnBoarding';

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
  background: rgba(255, 255, 255, 0.65);
  display: ${props => (props.open ? 'block' : 'none')};
`;

const Background = styled.section`
  height: 100vh;
`;

const Content = styled.div`
  position: absolute;
  top: 10%;
  bottom: 10%;
  left: 50%;
  width: 90%;
  margin: auto;
  padding: 60px 0;
  text-align: center;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 8px;
  box-shadow: 0 3px 6px #00000029;
`;

export default ({ children, open, close }: ModalProps) => {
  useNoScrollBody();

  return (
    <Container open={open}>
      <Background>
        <Content>
          <PopinClose>
            <CloseButton onClick={close} />
          </PopinClose>

          {children}
        </Content>
      </Background>
    </Container>
  );
};
