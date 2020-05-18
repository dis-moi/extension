import styled from 'styled-components';
import { LoadingRotator } from 'components/atoms';

const LoaderWrapper = styled(LoadingRotator)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default LoaderWrapper;
