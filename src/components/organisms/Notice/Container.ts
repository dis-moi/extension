import styled from 'styled-components';

interface Props {
  details?: boolean;
}
export default styled.article<Props>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: ${props => (props.details ? '15px' : '16px')};

  &:first-of-type {
    margin-top: 18px;
  }

  & + & {
    margin-top: 18px;
  }
`;
