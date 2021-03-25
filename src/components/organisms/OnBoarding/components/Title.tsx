import styled from 'styled-components';
import { Title } from 'components/atoms';

const OnboardingTitle = styled(Title)`
  max-width: 330px;
  margin-left: 62px;
  font-size: 30px;
  color: ${props => props.theme.primaryColor};
`;

export default OnboardingTitle;
