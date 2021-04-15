import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 29px;
  padding-left: 29px;
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.theme.secondaryColor};
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;

  & > div {
    margin-top: 32px;
  }

  & button {
    &:not(:first-of-type) {
      margin-left: 17px;
    }
  }
`;
