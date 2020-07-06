import styled from 'styled-components';

const Title2 = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 19px;
  font-weight: 900;
  color: ${props => props.theme.titleColor};

  @media (max-width: ${props => props.theme.tabletWidth}) {
    margin-left: 20px;
  }
`;

export default Title2;
