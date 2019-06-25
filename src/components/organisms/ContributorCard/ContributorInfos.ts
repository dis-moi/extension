import styled from 'styled-components';
import UserName from 'components/atoms/UserName/UserName';
import ContributorButton from './ContributorButton';

export default styled.div`
  flex-grow: 1;
  margin-right: 36px;
  margin-left: 15px;

  ${UserName} {
    margin-bottom: 5px;
  }

  ${ContributorButton} {
    width: 100%;
    margin-top: 5px;
  }
`;
