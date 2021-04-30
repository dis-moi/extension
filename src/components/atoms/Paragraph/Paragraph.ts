import styled from 'styled-components';

interface ParagraphProps {
  align?: 'right' | 'left' | 'center';
}

const Paragraph = styled.p<ParagraphProps>`
  margin: 0;
  font-size: ${props => props.theme.fontSizeDefault};
  color: ${props => props.theme.colorText};
  text-align: ${props => props.align || 'left'};

  @media (max-width: ${props => props.theme.tabletWidth}) {
    font-size: 18px;
  }
`;

export default Paragraph;
