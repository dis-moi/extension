import React from 'react';
import {
  Input,
  Label,
  FormGroup,
  Textarea,
  Error
} from 'components/atoms/Forms';
import { BackgroundButton } from 'components/atoms';
import { Wrapper } from '../components';

const CreateContributor = () => {
  return (
    <Wrapper>
      <section>
        <h1>What</h1>
        <p>Write the content of your contribution</p>

        <FormGroup>
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="title">Titre de la contribution *</Label>
          <p>
            Donner un nom à votre contribution (référence interne) ex.:
            &quote;Amazon shoes &quote;
          </p>
          <Input type="text" id="title" />
        </FormGroup>
      </section>

      <section>
        <h1>Where</h1>
        <p>Choose pages on which your message will appear</p>

        <article>
          <FormGroup>
            <Label htmlFor="targetPage1">Target page *</Label>
            <Input
              type="text"
              id="targetPage1"
              placeholder="https://monUrl.com"
            />
          </FormGroup>
        </article>

        <article>
          <BackgroundButton>Ajouter une autre page</BackgroundButton>
        </article>
      </section>

      <Error>Message d&apos;erreur</Error>

      <BackgroundButton>Enregistré en brouillon</BackgroundButton>
      <BackgroundButton>Enregistré et publier</BackgroundButton>
    </Wrapper>
  );
};

export default CreateContributor;
