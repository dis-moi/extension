import styled from 'styled-components';

const IntentionBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

IntentionBackground.defaultProps = {
  color: '#F1F1F4'
};

export default IntentionBackground;
