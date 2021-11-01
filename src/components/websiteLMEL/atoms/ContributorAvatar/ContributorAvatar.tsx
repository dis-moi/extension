import styled from 'styled-components';
import React from 'react';

const Link = styled.a`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: ${props => props.theme.websiteLMEL.boxShadow};
  background-color: white;
  background-size: cover;
  position: relative;
  &::after {
    opacity: 0;
    transition: opacity
      ${props => props.theme.websiteLMEL.animationFastDuration};
    content: '';
    background-color: rgba(236, 145, 25, 0.8);
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12.5,9H10V6.5C10,6.224,9.776,6,9.5,6S9,6.224,9,6.5V9H6.5C6.224,9,6,9.224,6,9.5S6.224,10,6.5,10H9v2.5 C9,12.776,9.224,13,9.5,13s0.5-0.224,0.5-0.5V10h2.5c0.276,0,0.5-0.224,0.5-0.5S12.776,9,12.5,9z M23.707,22.293l-6.825-6.825 C18.204,13.835,19,11.76,19,9.5C19,4.262,14.738,0,9.5,0C4.262,0,0,4.262,0,9.5S4.262,19,9.5,19c2.26,0,4.335-0.796,5.968-2.118    l6.825,6.825C22.488,23.902,22.744,24,23,24s0.512-0.098,0.707-0.293C24.098,23.316,24.098,22.684,23.707,22.293z M9.5,17 C5.364,17,2,13.636,2,9.5S5.364,2,9.5,2S17,5.364,17,9.5S13.636,17,9.5,17z"></path></svg>');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

export interface ProfileImageLinkProps {
  className?: string;
  imageUrl: string;
  name: string;
  handleClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const ContributorAvatar = styled(
  ({ className, name, handleClick }: ProfileImageLinkProps) => (
    <Link className={className} href={'#'} title={name} onClick={handleClick} />
  )
)`
  background-image: url(${props => props.imageUrl}),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="rgb(221,221,221)" opacity="0.5" d="M73 50c0-12.7-10.3-23-23-23S27 37.3 27 50m3.9 0c0-10.5 8.5-19.1 19.1-19.1S69.1 39.5 69.1 50"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"/></path></svg>');
`;

export default ContributorAvatar;
