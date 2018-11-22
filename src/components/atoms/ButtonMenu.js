import styled from 'styled-components';
import ButtonReset from './ButtonReset';

export default styled(ButtonReset)`
    font-size: 1.3em;
    color: ${props => props.theme.otherText};
`;