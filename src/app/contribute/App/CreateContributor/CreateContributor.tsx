import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/molecules/Avatar/Avatar';
import {
  Input,
  Label,
  FormGroup,
  Textarea,
  CheckboxLine,
  Error
} from 'components/atoms/Forms';
import { Button } from 'components/atoms';
import { Wrapper } from '../components';

const Banner = styled.div``;

const CreateContributor = () => {
  return (
    <Wrapper>
      <Banner>Banner</Banner>

      <Avatar size="large" />

      <FormGroup>
        <Label htmlFor="contributorName">Nom du compte contributeur *</Label>
        <Input type="text" id="contributorName" />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="website">Site</Label>
        <Input type="text" id="website" />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="intro">Intro</Label>
        <Textarea id="intro" />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="category">Category</Label>
        <CheckboxLine>
          <input type="checkbox" name="category" id="conso" />
          <label htmlFor="conso">Conso</label>
        </CheckboxLine>
        <CheckboxLine>
          <input type="checkbox" name="category" id="militant" />
          <label htmlFor="militant">Militant</label>
        </CheckboxLine>
        <CheckboxLine>
          <input type="checkbox" name="category" id="culture-societe" />
          <label htmlFor="culture-societe">Culture et Société</label>
        </CheckboxLine>
        <CheckboxLine>
          <input type="checkbox" name="category" id="divers" />
          <label htmlFor="divers">Divers</label>
        </CheckboxLine>
      </FormGroup>

      <Error>Message d&apos;erreur</Error>

      <Button>Envoyer</Button>
    </Wrapper>
  );
};

export default CreateContributor;
