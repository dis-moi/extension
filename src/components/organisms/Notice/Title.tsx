import styled from 'styled-components';

export default styled.p`
  position: relative;
  display: block;
  max-height: 63px;
  margin: 0 10px 0 0;
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
  line-height: 1.3;
  overflow: hidden;

  &:after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 3px;
    right: 0;
    width: 50%;
    height: 20px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    );
  }
`;
