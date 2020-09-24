import styled from 'styled-components';
import { BackgroundButton, Paragraph } from '../../atoms';

const PopinParagraph = styled(Paragraph)`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 20px;
  padding-left: 20px;
  text-align: left;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }

  strong {
    flex-basis: 100%;
    margin-bottom: -10px;
  }

  ${BackgroundButton} {
    min-width: 0;
    margin-top: 0;
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    strong {
      margin-bottom: 0;
    }
    ${BackgroundButton} {
      margin-top: 10px;
    }
  }
`;

export default PopinParagraph;
