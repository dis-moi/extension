import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  border-radius: ${props => props.theme.radiusL} 0 0
    ${props => props.theme.radiusL};
  overflow: hidden;

  img {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    display: block;
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: red;
    border-radius: 50%;
    z-index: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    border-radius: ${props => props.theme.radiusL}
      ${props => props.theme.radiusL} 0 0;

    &::before {
      top: initial;
      right: initial;
    }
  }
`;

export default ImageWrapper;
