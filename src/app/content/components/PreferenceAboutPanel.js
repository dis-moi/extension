import React from 'react';
import { Map } from 'immutable';
import { EXTENSION_VERSION } from '../../constants/ui';

function formatLocaleDate(strDate) {
  const dateOfInstall = new Date(strDate);

  if (Number.isNaN(dateOfInstall.getTime()))
    return undefined;

  return dateOfInstall.toLocaleDateString(navigator.language,
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function PreferenceAboutPanel(props) {
  const { onInstalledDetails } = props;
  const ISODateOfInstall = Map.isMap(onInstalledDetails) && onInstalledDetails.get('datetime');
  const localeDateOfInstall = ISODateOfInstall && formatLocaleDate(ISODateOfInstall);

  return (
    <div>
      <section>
        <h1>
          Le Même en Mieux est un assistant d’achat indépendant des vendeurs et des marques.
        </h1>
        { localeDateOfInstall && (
          <p>Vous l’avez installé le <time dateTime={ISODateOfInstall}>{localeDateOfInstall}</time>.</p>
        )}

        <p>
          {'Pour découvrir ou faire découvrir le Même en Mieux autour de vous, '}
          <a
            href="https://choisir.lmem.net/decouvrir-exemples/"
            target="_blank">
            rendez-vous sur cette page d’exemples
          </a>.
        </p>

      </section>
      <aside>
        <ul>
          <li><a target="_blank" href="https://choisir.lmem.net/questions-frequentes-aide/">Aide</a></li>
          <li><a target="_blank" href="https://www.lmem.net/projet">À propos</a></li>
          <li><a target="_blank" href="https://www.lmem.net/contact.html">Contact</a></li>
          <li><a
            target="_blank"
            href="https://choisir.lmem.net/charte-de-respect-de-la-vie-privee-5-regles-dor/">
            Vie privée
          </a></li>
          <li><a target="_blank" href="https://www.lmem.net/cgu.html">CGU</a></li>
          <li><a target="_blank" href="https://choisir.lmem.net/desinstaller-meme-mieux/">Désinstaller</a></li>
          <li>v{EXTENSION_VERSION}</li>
        </ul>
      </aside>
    </div>
  );
}
