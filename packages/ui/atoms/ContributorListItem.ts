import styled from 'styled-components';

const ContributorListItem = styled.li`
  cursor: hand;

  &:not(:first-of-type) {
    margin-left: 16px;
  }
`;

export default ContributorListItem;
