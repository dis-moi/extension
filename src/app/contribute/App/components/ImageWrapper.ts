import styled from 'styled-components';

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
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
    border-radius: ${props => props.theme.radiusL} 50% 50%
      ${props => props.theme.radiusL};
    z-index: 0;
  }
`;

export default ImageWrapper;
