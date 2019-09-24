import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'components/atoms';

const TOSForm = styled.form`
  display: flex;
  align-items: center;
  font-size: 20px;

  [type='checkbox'] {
    align-self: baseline;
  }

  label {
    margin-left: 12px;
  }
`;

interface Props {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const TOSCheckbox = ({ onChange, checked }: Props) => (
  <TOSForm>
    <input
      type="checkbox"
      id="tos"
      onChange={event => onChange(event.target.checked)}
      checked={checked}
    />
    <label htmlFor="tos">
      J&apos;ai lu et j&apos;accepte les nouvelles{' '}
      <ExternalLink href="https://www.bulles.fr/cgu">
        conditions générales d&apos;utilisation (CGU)
      </ExternalLink>
      .
    </label>
  </TOSForm>
);

export default TOSCheckbox;
