import styled from 'styled-components';

interface Props {
  error?: boolean;
}

export default styled.select<Props>`
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  padding: 4px 12px 4px 8px;
  font-size: 12px;
  color: ${props => props.theme.activeColor};
  font-weight: bold;
  border-radius: 6px;
  border: 1px solid
    ${props => (props.error ? props.theme.formError : props.theme.activeColor)};
  box-shadow: 0 0 0 2px
    ${props => (props.error ? props.theme.formError : '#fff')};
  resize: none;
`;
