import styled from 'styled-components';
import StatsWrapper from './StatsWrapper';
import UserName from '../UserName/UserName';

const ContributorCard = styled.div`
  padding: 12px 15px 15px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: ${props => props.theme.radius};

  ${UserName} {
    margin-bottom: 5px;
  }

  ${StatsWrapper} {
    margin-bottom: 10px;

    @media (max-width: ${props => props.theme.tabletWidth}) {
      margin-bottom: 5px;
    }
  }
`;

export default ContributorCard;
