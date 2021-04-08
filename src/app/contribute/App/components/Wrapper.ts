import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  max-width: 768px;
  min-height: 445px;
  width: 100%;
  background-color: #ffffff;
  border-radius: ${props => props.theme.radiusL};
`;

export default Wrapper;
