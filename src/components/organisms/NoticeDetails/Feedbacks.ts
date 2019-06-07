import styled from 'styled-components';
import { Theme } from 'app/theme';

interface FeedbacksProps {
  theme?: Theme;
}

export default styled.div<FeedbacksProps>`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  font-size: 14px;

  & button {
    color: ${props => props.theme.navInactive};
    text-decoration: none;

    svg {
      transition: all 0.2s ease-in-out;
      margin-right: 3px;
      stroke: ${props => props.theme.secondaryColor};
      fill: #fff;
      vertical-align: middle;
      transform: scale(-1, 1);
    }

    & + button {
      margin-left: 20px;
    }

    &:hover {
      svg {
        stroke: ${props => props.theme.secondaryColor};
        stroke-width: 0.5px;
      }
    }
  }
`;
