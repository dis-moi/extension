import React from 'react';
import Title from './Title';
import { BorderButton, Button, Paragraph, Error, Link } from './index';
import { Title1 } from './Titles';

export default {
  title: 'Components/Composants inter produits'
};

export const Liste = () => (
  <>
    <Title>Colors</Title>

    <Title>Buttons</Title>
    <Button>Default button</Button>
    <Button disabled>Default button inactive</Button>
    <Button>Default button success</Button>
    <BorderButton>Border button</BorderButton>

    <Title>Titles</Title>
    <Title1>Title 1 (h1)</Title1>
    <Title1>Title 2 (h2)</Title1>
    <Title1>Title 3 (h3)</Title1>
    <Title1>Title 4 (h4)</Title1>

    <Title>Texts</Title>
    <Paragraph>Default paragrah</Paragraph>
    <Error>Error paragrah</Error>
    <Paragraph>Small text</Paragraph>

    <Title>Links</Title>
    <Link to="">Link</Link>

    <Title>Avatars</Title>
    <Title>Forms</Title>
    <Title>Checkboxes</Title>
    <Title>Radio buttons</Title>
    <Title>Icons</Title>
  </>
);

Liste.story = {
  name: 'Composants inter produits'
};
