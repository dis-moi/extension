import styled from 'styled-components';
import { BackgroundButton } from '../../../atoms';

type Color = string | undefined;
const BackgroundColor = (color: Color) => {
  switch (color) {
    case 'inactive':
      return '#8A8B8E';
    default:
      return '#0CB46D';
  }
};

const OnboardingButton = styled(BackgroundButton)`
  display: flex;
  align-items: center;
  padding: 15px 34px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
  border-radius: 33px;
  background-color: ${({ color }) => BackgroundColor(color)};
  border: ${({ color }) => BackgroundColor(color)};

  &:hover {
    background-color: ${({ color }) => BackgroundColor(color)};
    border: ${({ color }) => BackgroundColor(color)};
  }

  svg {
    margin-right: 16px;
    width: 32px;
    height: auto;
  }
`;

export default OnboardingButton;
