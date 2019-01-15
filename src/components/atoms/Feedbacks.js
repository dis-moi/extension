import styled from 'styled-components';
import Button from './Button';

export default styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    font-size: 14px;

    & ${Button} {
        color: ${props => props.theme.navInactive};

        svg {
            margin-right: 3px;
            stroke: ${props => props.theme.secondaryColor};
            fill: #fff;
            vertical-align: middle
        }

        & + ${Button} {
            margin-left: 20px;
        }
        
        &:hover {
            svg {
                stroke: #fff;
                stroke-width: .5px;
                fill: ${props => props.theme.secondaryColor};
            }
        }
    }
`;
