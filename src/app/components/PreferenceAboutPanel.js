import React, { Component, PropTypes } from 'react';
import { EXTENSION_VERSION } from '../constants/ui';

export default function ({ onInstalledDetails }) {
  const dateOfInstall = new Date(onInstalledDetails.get('datetime'));
  const localeDateOfInstall = dateOfInstall.toLocaleDateString('fr',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div>
      <section>
        <h1>
          Le Même en Mieux est un assistant d’achat que vous avez installé le&nbsp;
          <time dateTime={dateOfInstall.toISOString()}>{localeDateOfInstall}</time>.
        </h1>
        <p>
          Quand vous consultez un produit sur Internet, il vous trouve des conseils d’achat,
          des comparatifs et de meilleures alternatives, selon vos préférences.
        </p>

        {/* <h2>Localisation</h2>*/}
        {/* <p>*/}
          {/* Si possible, l’extension filtre les recommandations pertinentes pour votre localité&nbsp;:&nbsp;*/}
          {/* <button className="not-button">33 600 PESSAC (changer)</button>.*/}
        {/* </p>*/}
      </section>
      <aside>
        <p>Le Même en Mieux est un service indépendant des sites Web consultés.</p>
        <ul>
          <li><a target="_blank" href="http://support.lmem.net">Aide</a></li>
          <li><a target="_blank" href="http://www.lmem.net/contact.html">Contact</a></li>
          <li><a
            target="_blank"
            href="http://help.lmem.net/knowledge_base/topics/comment-utilisez-vous-mes-donnees-personnelles?from_search=true">
            Vie privée
          </a></li>
          <li><a target="_blank" href="http://www.lmem.net/cgu.html">CGU</a></li>
          <li>v{EXTENSION_VERSION}</li>
        </ul>
      </aside>
    </div>
  );
}
