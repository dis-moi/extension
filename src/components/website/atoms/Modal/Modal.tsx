import React from 'react';
import styled from 'styled-components';

interface BackgroundProps {
  className?: string;
  open: boolean;
}

const Background = styled.div`
  display: ${(props: BackgroundProps) => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(40, 85, 162, 0.95);
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

export interface ModalProps {
  className?: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const Modal = styled(({ className, children, open, setOpen }: ModalProps) => {
  // useEffect(() => {}, [open]);
  return (
    <Background
      className={className}
      open={open || false}
      onClick={() => setOpen(false)}
    >
      <Content>{children}</Content>
    </Background>
  );
})``;

export default Modal;
