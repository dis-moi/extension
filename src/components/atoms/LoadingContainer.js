import styled from 'styled-components';

export default styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;

    & svg {
        margin-bottom: 15px;
        animation: rotation 2s linear infinite;
    }

    @keyframes rotation {
        100% {
            transform: rotate(360deg)
        }
    }
`;