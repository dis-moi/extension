import React from 'react';
import styled from 'styled-components';
import Play from './Play';

export interface ImageBackgroundProps {
  className?: string;
  image: string;
}

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform ${props => props.theme.website.animationFastDuration};
  background-size: cover;
  background-image: url(${(props: ImageBackgroundProps) => props.image});
`;

const ColorBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color
    ${props => props.theme.website.animationFastDuration};
  background-color: rgba(40, 85, 162, 0.95);
  &:active {
    background-color: ${props => props.theme.website.activeColor};
  }
`;

const StyledPlay = styled(props => <Play {...props} />)`
  position: relative;
  width: 60px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    width: 80px;
  }
  margin-right: 15px;
  path {
    fill: white;
  }
  pointer-events: none;
`;

const Text = styled.div`
  position: relative;
  color: white;
  pointer-events: none;
  font-family: ${props => props.theme.website.fontFamily};
  font-size: 18px;
  width: 160px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 22px;
    width: 200px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  max-width: 600px;
  padding: 0;
  overflow: hidden;
  border-radius: ${props => props.theme.website.radius};
  box-shadow: ${props => props.theme.website.boxShadow};
  &::before {
    display: block;
    content: '';
    padding-top: 56.25%;
  }
  &:hover {
    ${ImageBackground} {
      transform: scale(1.2);
    }
    ${ColorBackground} {
      background-color: rgb(23, 186, 174, 0.95);
    }
  }
  &:active {
    ${ColorBackground} {
      background-color: rgb(255, 152, 29, 0.95);
    }
  }
`;

export interface VideoImageProps {
  className?: string;
  text: string;
  image: string;
  handleClick?: () => void;
}

const VideoImage = ({
  className,
  text,
  image,
  handleClick
}: VideoImageProps) => {
  return (
    <Wrapper className={className} onClick={() => handleClick && handleClick()}>
      <ImageBackground image={image} />
      <ColorBackground />
      <StyledPlay />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default VideoImage;
