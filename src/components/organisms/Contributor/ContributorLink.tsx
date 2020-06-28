import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';

const ContributorLink = styled(ExternalLink)`
  display: inline-block;
  font-size: 12px;
  color: ${props => props.theme.activeColor};
  text-transform: uppercase;
`;

export default ContributorLink;
