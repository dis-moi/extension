import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import theme from './theme';

const isHexColor = (color: ObjectWithColors | string): boolean =>
  typeof color === 'string' && /^#(?:[0-9a-f]{3}){1,2}$/i.test(color);

const isObject = (
  object: ObjectWithColors | string
): object is ObjectWithColors =>
  object !== null && object.constructor.name === 'Object';

const ColorListItemContainer = styled.li`
  margin: 0;
  text-indent: 0;
  list-style-type: none;
  border-radius: 5px;
  border: 1px solid lightgray;
  padding: 5px;
`;

const Color = styled.li`
  background-color: ${({ color }) => color};
  display: block;
  height: 4em;
  margin-bottom: 0.3em;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

interface ColorListItemProps {
  name: string;
  color: string;
}

const ColorListItem = ({ name, color }: ColorListItemProps) => (
  <ColorListItemContainer>
    <Color color={color} />
    <span>{name}</span>
    <br />
    <span>{color}</span>
    <br />
  </ColorListItemContainer>
);

const ColorListContainer = styled.ul`
  background-color: white;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 175px));
  grid-column-start: 1;
  grid-gap: 20px;
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: none;
`;

interface ObjectWithColors {
  [key: string]: ObjectWithColors | string;
}

interface ColorListProps {
  colors: ObjectWithColors;
}
const ColorList = ({ colors }: ColorListProps) => {
  return (
    <ColorListContainer>
      {Object.keys(colors).map(key => {
        const subValue = colors[key];
        if (typeof subValue === 'string' && isHexColor(subValue)) {
          return <ColorListItem key={key} name={key} color={subValue} />;
        }
        if (isObject(subValue)) {
          return (
            <ColorListItemContainer key={key}>
              <h2>{key}</h2>
              <ColorList colors={subValue} />
            </ColorListItemContainer>
          );
        }
      })}
    </ColorListContainer>
  );
};

storiesOf('Theme', module).add('Colors', () => (
  <ColorList colors={(theme as unknown) as ObjectWithColors} />
));
