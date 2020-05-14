import styled from 'styled-components';
import { BackgroundButton, Paragraph } from '../../atoms';

const PopinParagraph = styled(Paragraph)`
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;

  &:not(:last-child) {
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
`;

export default PopinParagraph;
