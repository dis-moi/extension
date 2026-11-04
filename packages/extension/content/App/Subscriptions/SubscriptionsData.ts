import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;

  div {
    flex-basis: 33.3333%;
  }

  span {
    display: block;
    font-size: 15px;

    &:first-child {
      font-size: 30px;
    }
  }
`;
