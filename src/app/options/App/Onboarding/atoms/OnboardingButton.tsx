import styled from 'styled-components';
import BackgroundButton from 'components/atoms/Button/BackgroundButton';

const OnboardingButton = styled(BackgroundButton)`
  margin: 16px auto;
  padding: 15px 26px;
  font-size: 24px;
  background-color: #2a842a;
  border-color: #2a842a;

  &:hover {
    color: #fff;
    background-color: #145514;
    border-color: #145514;
  }
`;

export default OnboardingButton;
