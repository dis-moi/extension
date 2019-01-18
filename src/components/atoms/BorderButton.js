import styled from 'styled-components';
import Button from './Button';

export default styled(Button)`
   height: 28px;
   padding: 2px 12px 0;
   font-size: 15px;
   color: ${props => props.theme.button};
   text-decoration: none;
   background-color: #fff;
   border: 2px solid ${props => props.theme.button};

   &:hover {
      color: #fff;
      background-color: ${props => props.theme.button};
    }
`;

