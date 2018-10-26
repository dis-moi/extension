/**
 * Created by insitu on 07/06/16.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Loader = ({ imagesUrl }) => (
  <div id="loader">
    <aside className="lmem-topbar fixed">

      <div className="lmem-topbar-notification">

        <div className="mainframe">
          <section className="mainframe-inner">
            <h2 className="alternatives-searching-title visually-hidden">
          Recommandations en cours de chargement…
            </h2>

            <div className="alternatives-searching-wrapper">
              <div className="alternatives-searching-progress" />

              <p className="alternatives-searching-content">
              Recommandations en cours de chargement…
              </p>
            </div>
          </section>
        </div>
      </div>

      <a className="lmem-topbar-logo with-tooltip">
        <img src={imagesUrl + 'logo-lmem.svg'} alt="" />
      </a>
    </aside>
  </div>
);

Loader.propTypes = {
  imagesUrl: PropTypes.string.isRequired
};

export default Loader;