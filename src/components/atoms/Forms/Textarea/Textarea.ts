import styled from 'styled-components';

interface Props {
  error?: boolean;
}

export default styled.textarea<Props>`
  box-sizing: border-box;
  width: 100%;
  padding: 7px 12px 7px 12px;
  font-size: ${props => props.theme.fontSizeM};
  border-radius: ${props => props.theme.radiusM};
  border: 1px solid
    ${props =>
      props.error ? props.theme.colorError : props.theme.colorGrey300};
  box-shadow: inset 0 0 0 1px
    ${props => (props.error ? props.theme.colorError : '#fff')};
  resize: none;
`;
