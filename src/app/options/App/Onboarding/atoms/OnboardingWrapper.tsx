import styled from 'styled-components';
import { BackgroundButton } from '../../../../../components/atoms';

const Wrapper = styled.main`
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  padding-right: 20px;
  padding-bottom: 20px;
  color: ${props => props.theme.primaryColor};

  ${BackgroundButton} {
    display: block;
  }
`;

export default Wrapper;
