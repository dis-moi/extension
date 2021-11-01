import React from 'react';
import styled from 'styled-components';
import Modal from '../../atoms/Modal/Modal';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import SmallTitle from '../../atoms/Titles/SmallTitle';

const StyledSectionTitle = styled(props => <SectionTitle {...props} />)`
  color: white;
  padding: 0 15px;
  margin-bottom: 5px;
`;

const StyledSmallTitle = styled(props => <SmallTitle {...props} />)`
  color: white;
  padding: 0 15px;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  position: relative;
  width: calc(100% - 30px);
  max-width: 1000px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    width: calc(100% - 100px);
  }
  &::before {
    display: block;
    content: '';
    padding-top: 56.25%;
  }
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export interface VideoModalProps {
  className?: string;
  src: string;
  title?: string;
  smallTitle?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VideoModal = styled(
  ({ className, src, title, smallTitle, open, setOpen }: VideoModalProps) => {
    return (
      <Modal className={className} open={open} setOpen={setOpen}>
        <StyledSectionTitle>{title}</StyledSectionTitle>
        <StyledSmallTitle>{smallTitle}</StyledSmallTitle>
        <Wrapper>
          <Iframe
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Wrapper>
      </Modal>
    );
  }
)``;

export default VideoModal;
