import React, { Component, PropTypes } from 'react';

export default function PopupScreen({ imagesUrl, openPrefScreenAbout, openPrefScreenSources }) {
  return (
    <section>
      <p>Popup ok.</p>
      <p>Image Src: {imagesUrl}</p>
      <div><a onClick={openPrefScreenAbout} href>Préférences</a></div>
      <div><a onClick={openPrefScreenSources} href>Sources de recommandation</a></div>
    </section>
  );
}

