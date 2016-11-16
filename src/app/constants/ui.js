import React, { Component } from 'react';

export const PREFERENCE_SCREEN_PANEL_ABOUT = 'PREFERENCE_SCREEN_PANEL_ABOUT';
export const PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES = 'PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES';
export const PREFERENCE_SCREEN_PANEL_CRITERIA = 'PREFERENCE_SCREEN_PANEL_CRITERIA';
export const PREFERENCE_SCREEN_PANEL_SOURCES = 'PREFERENCE_SCREEN_PANEL_SOURCES';

export const EXTENSION_VERSION = chrome.runtime.getManifest().version;

function headerContent(imagesUrl, currPanel) {
  return (
    <strong className="lmem-topbar-preferences">
      <img
        role="presentation"
        src={ imagesUrl + 'settings.svg' }
        className="lmem-controls-picto" />
      <span>Préférences</span>
      <span>{currPanel}</span>
    </strong>
  );
}

export const HEADER_CONTENT = {
  [PREFERENCE_SCREEN_PANEL_ABOUT]: imagesUrl => headerContent(imagesUrl, 'À propos'),

  [PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES]: imagesUrl => headerContent(imagesUrl, 'Sites désactivés'),

  [PREFERENCE_SCREEN_PANEL_CRITERIA]: imagesUrl => headerContent(imagesUrl, 'Critères de choix'),

  [PREFERENCE_SCREEN_PANEL_SOURCES]: imagesUrl => headerContent(imagesUrl, 'Sources de recommandation'),

  default: (<strong>Le Même en Mieux</strong>)
};