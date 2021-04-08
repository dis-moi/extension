import React from 'react';
import { Title1, Title2, Title3, Title4 } from './index';

export default {
  title: 'Components/Atoms/Titles'
};

export const _Title1 = () => <Title1>Title level 1 - h1</Title1>;
export const _Title2 = () => <Title2>Title level 2 - h2</Title2>;
export const _Title3 = () => <Title3>Title level 3 - h3</Title3>;
export const _Title4 = () => <Title4>Title level 4 - h4</Title4>;

_Title1.story = {
  name: 'Title1'
};
_Title2.story = {
  name: 'Title2'
};
_Title3.story = {
  name: 'Title3'
};
_Title4.story = {
  name: 'Title4'
};
