import styled from 'styled-components';

interface GridProps {
  col?: number;
  direction?: 'column';
}

const GridContainer = styled.div<GridProps>`
  display: flex;
  width: 100%;
  margin: 1em 1em 0em;
  padding: 1em;
  justify-content: space-around;
`;

const GridItem = styled.div<GridProps>`
  display: flex;
  flex: ${props => props.col || null};
  flex-direction: ${props => props.direction || 'initial'};
`;

export { GridContainer, GridItem };
