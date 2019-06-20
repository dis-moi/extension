import styled from 'styled-components';
import Button from 'components/atoms/Button';

interface Props {
  active?: boolean;
}

export default styled(Button)<Props>`
  padding: 8px 16px 8px;
  font-size: 17px;
  line-height: 1.2;
  font-weight: 500;
  text-transform: none;
  text-decoration: none;
  color ${props => (props.active ? '#FFF' : props.theme.formBorder)};
  background-color ${props =>
    props.active ? props.theme.activeColor : props.theme.contributorGrey};
  border-radius: 8px 8px 0 0;

  &:hover {
    color: ${props => (props.active ? '#FFF' : props.theme.activeColor)};
  }
`;

