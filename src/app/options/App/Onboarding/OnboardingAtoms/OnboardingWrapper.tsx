import styled from 'styled-components';

const Wrapper = styled.main`
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  padding-right: 20px;
  padding-bottom: 20px;
  color: ${props => props.theme.primaryColor};
`;

export default Wrapper;
