import styled from 'styled-components';
import ContributorNameLink from 'components/organisms/Contributor/ContributorNameLink';
import UserName from './UserName';

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
