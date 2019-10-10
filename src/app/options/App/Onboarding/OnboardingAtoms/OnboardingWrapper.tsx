import styled from 'styled-components';

interface OnboardingWrapperProps {
  bulles?: boolean;
}

const OnboardingWrapper = styled.main<OnboardingWrapperProps>`
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  padding-right: 20px;
  padding-bottom: 20px;
  color: ${props => props.theme.primaryColor};
  background: ${({ bulles }) => (bulles ? 'red' : 'transparent')};
`;

export default OnboardingWrapper;
