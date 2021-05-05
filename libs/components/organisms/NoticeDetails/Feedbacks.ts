import styled from 'styled-components';
import { Index } from 'libs/theme';
import { Button } from 'libs/components/atoms';

interface FeedbacksProps {
  theme?: Index;
}

export default styled.div<FeedbacksProps>`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  margin-right: 30px;
  font-size: 14px;

  & ${Button} {
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

    & + ${Button} {
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
