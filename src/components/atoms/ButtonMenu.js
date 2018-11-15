import styled from 'styled-components';
import ButtonReset from './ButtonReset';

export default styled(ButtonReset)`
    font-size: 13px;
    color: ${props => props.theme.otherText};
`;