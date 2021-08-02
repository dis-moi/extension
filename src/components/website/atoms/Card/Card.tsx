import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
  background: white;
  border-radius: ${props => props.theme.website.radius};
  box-shadow: ${props => props.theme.website.boxShadow};
  padding: 17px 15px 15px 15px;
`;

export default Card;
