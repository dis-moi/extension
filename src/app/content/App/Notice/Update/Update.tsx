import React from 'react';
import { BackgroundButton } from 'components/atoms';

interface UpdateScreenProps {
  openOnboarding: () => void;
}

export default ({ openOnboarding }: UpdateScreenProps) => (
  <div>
    <h1>Le Même en Mieux</h1>
    <p>Bonjour, votre extension évolue.</p>
    <p>Pour continuer à l&apos;utiliser, merci de la mettre à jour.</p>
    <BackgroundButton onClick={openOnboarding}>Mettre à jour</BackgroundButton>
  </div>
);
