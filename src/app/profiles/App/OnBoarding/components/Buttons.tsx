import styled from 'styled-components';
import { BackgroundButton } from 'components/atoms';

type ButtonState = 'inactive' | undefined;
type Color = string | ButtonState;
const getBackgroundColor = (color: Color) => {
  if (color === 'inactive') return '#8A8B8E';
  return '#0CB46D';
};

const OnboardingButton = styled(BackgroundButton)`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size: 22px;
  line-height: 1.2;
  font-weight: 600;
  background-color: ${({ color }) => getBackgroundColor(color)};
  border: ${({ color }) => getBackgroundColor(color)};
  border-radius: 33px;

  &:hover {
    background-color: ${({ color }) => getBackgroundColor(color)};
    border: ${({ color }) => getBackgroundColor(color)};
  }

  &:first-of-type {
    svg {
      width: 20px;
      height: auto;
      margin-right: 8px;
    }
  }
`;

export default OnboardingButton;
