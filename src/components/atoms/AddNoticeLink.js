import styled from 'styled-components';

// should move to molecule, button only should be an atom
export default styled.button`
    box-sizing: border-box;
    padding: 2px 12px 0;
    height: 28px;
    margin-top: 25px;
    font-size: 15px;
    line-height: 1;
    font-weight: normal;
    color: ${props => props.theme.secondaryColor};
    text-transform: uppercase;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 5px;
    cursor: pointer;

    & > svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
      fill: ${props => props.theme.secondaryColor};
    }

    &:hover {
      color: #fff;
      background-color: ${props => props.theme.secondaryColor};

      & > svg {
        fill: #fff;
      }
    }
`;