import styled from 'styled-components';
import { Link } from 'components/atoms';

const ContributorNameLink = styled(Link).attrs({
  'data-test-type': 'contributor-name-link'
})`
  font-weight: normal;
  text-decoration: none;
`;

export default ContributorNameLink;
