import React, { Component } from 'react';

export const PREFERENCE_SCREEN_PANEL_ABOUT = 'PREFERENCE_SCREEN_PANEL_ABOUT';
export const PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES = 'PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES';

export const HEADER_CONTENT = {
  [PREFERENCE_SCREEN_PANEL_ABOUT]: imagesUrl => (
    <strong>
      <img
        role="presentation"
        src={ imagesUrl + 'settings.svg' }
        className="lmem-controls-picto" />
      <span>Préférences de l'extension - A propos</span>
    </strong>
  ),

  [PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES]: imagesUrl => (
    <strong>
      <img
        role="presentation"
        src={ imagesUrl + 'settings.svg' }
        className="lmem-controls-picto" />
      <span>Préférences de l'extension - Sites désactivés</span>
    </strong>
  ),

  default: (<strong>Le Même en Mieux</strong>)
};