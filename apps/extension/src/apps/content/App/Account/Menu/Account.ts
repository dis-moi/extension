import styled from 'styled-components';

export default styled.nav`
  & a {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    padding: 21px 14px 20px 23px;
    font-size: 16px;
    font-weight: bold;
    color: ${props => props.theme.secondaryColor};
    text-decoration: none;
    border: 2px solid transparent;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${props => props.theme.activeColor};
      border-color: ${props => props.theme.activeColor};
    }

    &:nth-child(odd) {
      background-color: #fafafa;
    }

    &:last-child:not(:nth-child(odd)) {
      border-bottom: 2px solid #fafafa;

      &:hover {
        border-color: ${props => props.theme.activeColor};
      }
    }

    & [class^='OpenButton'] {
      height: auto;
      transform: rotate(180deg);
    }
  }
`;
