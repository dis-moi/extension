import styled from 'styled-components';

export default styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.theme.grey};

  & > svg {
    margin-right: 6px;
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    font-size: 16px;
  }
`;
