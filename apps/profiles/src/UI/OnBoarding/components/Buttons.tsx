import styled from 'styled-components';
import { BackgroundButton } from 'src/components/atoms';

type ButtonState = 'inactive' | undefined;
type Color = string | ButtonState;
const getBackgroundColor = (color: Color) => {
  if (color === 'inactive') return '#8A8B8E';
  return '#0CB46D';
};

const OnboardingButton = styled(BackgroundButton)`
  display: flex;
  align-items: center;
  padding: 15px 34px;
  font-size: 30px;
  line-height: 1.2;
  font-weight: 600;
  background-color: ${({ color }) => getBackgroundColor(color)};
  border: ${({ color }) => getBackgroundColor(color)};
  border-radius: 33px;

  &:hover {
    background-color: ${({ color }) => getBackgroundColor(color)};
    border: ${({ color }) => getBackgroundColor(color)};
  }

  svg {
    width: 32px;
    height: auto;
    margin-right: 16px;
  }
`;

export default OnboardingButton;
