import styled from 'styled-components';
import UserName from './UserName';
import ContributorNameLink from 'components/organisms/Contributor/ContributorNameLink';

export default styled(UserName).attrs(() => ({
  as: 'h3'
}))`
  margin-bottom: 10px;

  ${ContributorNameLink} {
    display: block;
    font-size: 16px;
    white-space: normal;
  }
`;
