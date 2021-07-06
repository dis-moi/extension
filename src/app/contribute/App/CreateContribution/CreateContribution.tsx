import React from 'react';
import {
  Input,
  Label,
  FormGroup,
  Textarea,
  Error
} from 'components/atoms/Forms';
import { Button } from 'components/atoms';
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
          <Button>Ajouter une autre page</Button>
        </article>
      </section>

      <Error>Message d&apos;erreur</Error>

      <Button>Enregistré en brouillon</Button>
      <Button>Enregistré et publier</Button>
    </Wrapper>
  );
};

export default CreateContributor;
