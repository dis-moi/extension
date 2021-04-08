import styled from 'styled-components';

interface Props {
  error?: boolean;
}

export default styled.input<Props>`
  box-sizing: border-box;
  width: 100%;
  padding: 7px 12px 7px 12px;
  font-size: ${props => props.theme.fontSizeM};
  line-height: 1;
  border-radius: ${props => props.theme.radiusM};
  border: 1px solid
    ${props => (props.error ? props.theme.formError : props.theme.colorGrey1)};
  box-shadow: inset 0 0 0 1px
    ${props => (props.error ? props.theme.formError : '#fff')};
`;
