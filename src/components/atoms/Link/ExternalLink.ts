import styled from 'styled-components';
import Anchor from './Anchor';

const ExternalLink = styled(Anchor).attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  text-decoration: none;

  & > svg {
    fill: ${props => props.theme.grey};
    margin-right: 5px;
  }
`;

export default ExternalLink;
