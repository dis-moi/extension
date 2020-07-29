import styled from 'styled-components';
import ContributorName from 'components/atoms/ContributorName';

export default styled.div`
  display: flex;
  align-items: center;

  ${ContributorName} {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
  }
`;
