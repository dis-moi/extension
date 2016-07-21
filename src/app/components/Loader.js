/**
 * Created by insitu on 07/06/16.
 */

import React, { Component, PropTypes } from 'react';

const Loader = ({ imagesUrl }) => (
  <div id="loader">
    <aside className="lmem-topbar fixed">

      <div className="lmem-topbar-notification">

        <div className="mainframe"><section className="mainframe-inner">
          <h2 className="alternatives-searching-title visually-hidden">
          Recherche d’alternatives en cours…</h2>

          <div className="alternatives-searching-wrapper">
            <div className="alternatives-searching-progress"></div>

            <p className="alternatives-searching-content">
              Nous recherchons pour vous les alternatives.
            </p>
          </div>
        </section>
        </div>
      </div>

      <a className="lmem-topbar-logo with-tooltip" href="">
        <img src={imagesUrl + 'logo-lmem.svg'} alt="" />
      </a>
    </aside>
  </div>
);

Loader.propTypes = {
  imagesUrl: PropTypes.string.isRequired
};

export default Loader;