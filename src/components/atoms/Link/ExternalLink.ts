import styled from 'styled-components';
import Anchor from './Anchor';

const ExternalLink = styled(Anchor).attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  & > svg {
    fill: ${props => props.theme.grey};
  }
`;

export default ExternalLink;
