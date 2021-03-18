import styled from 'styled-components';

interface GridProps {
  direction?: 'column';
  justifyContent?: 'center' | 'space-around' | 'flex-start';
  gap?: number;
}

const GridContainer = styled.div<GridProps>`
  display: flex;
  margin: 1em 1em 0em;
  padding: 1em;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justifyContent || 'center'};
  gap: ${props => props.gap + 'em' || 0};
`;

const GridItem = styled.div<GridProps>`
  flex: 1;
  flex-basis: 100%;
`;

export { GridContainer, GridItem };
