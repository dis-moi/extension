import styled from 'styled-components';
import { Contributor } from 'libs/domain/contributor';

interface ContributorCardProps {
  contributor: Contributor;
}

const ContributorCard = styled.div.attrs<ContributorCardProps>(props => ({
  'data-test-type': 'contributor-card',
  'data-test-contributor-name': props.contributor.name
}))<ContributorCardProps>`
  padding: 12px 15px 15px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: ${props => props.theme.radius};
`;

export default ContributorCard;
