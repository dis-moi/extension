import styled from 'styled-components';
import Background from './Background';

const GradientBackground = styled(Background)`
  background: ${(props) => props.theme.website.coverSectionBackgroundColor};
  background: ${(props) => props.theme.website.coverSectionBackgroundColorBis};
`;

export default GradientBackground;
