import styled from 'styled-components';
import Button from 'components/atoms/Button';

interface Props {
  active?: boolean;
}

export default styled(Button)<Props>`
  padding: 8px 16px 8px;
  font-size: 18px;
  line-height: 1.2;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  text-transform: none;
  text-decoration: none;
  color: ${props => (props.active ? '#000' : props.theme.textColor)};
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: ${props =>
    props.active ? props.theme.textColor : 'transparent'};
  border-radius: 0;

  &:hover {
    color: ${props => props.theme.textColor};
  }
`;
