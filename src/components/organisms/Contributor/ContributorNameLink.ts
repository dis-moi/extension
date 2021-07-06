import styled from 'styled-components';
import { Link } from 'components/atoms';

const ContributorNameLink = styled(Link)`
  font-weight: normal;
  font-size: ${props => props.theme.fontSizeM1};
  text-decoration: none;
`;

export default ContributorNameLink;
