import styled from 'styled-components';
import UserName from '../UserName/UserName';

const ContributorCard = styled.div`
  padding: 12px 15px 20px;
  background-color: #fff;
  border: 1px solid #dedede;
  border-radius: 8px;

  ${UserName} {
    margin-bottom: 5px;
  }
`;

export default ContributorCard;
