import styled from 'styled-components';
import Button from './Button';

export default styled(Button).attrs({ children: 'Afficher le menu' })`
    font-size: 1.3em;
    color: ${props => props.theme.otherText};
`;