import React, { Component, PropTypes } from 'react';

const AlternativeHeader = ({imagesUrl}) => (
    <header className="lmem-topbar fixed">
        <div className="lmem-topbar-notification">

            <div className="mainframe">
                <div className="mainframe-inner">
                    <h1 className="lmem-topbar-title">
                        <strong>{ 'Le Même en Mieux' }</strong>
                    </h1>
                </div>
            </div>
        </div>

        <div className="button-wrapper">
            <div className="button-directive">
                <button title="Réduire" className="button button-compact with-image">
                    <img src={ imagesUrl + 'arrow.svg' } className="lmem-controls-picto lmem-controls-close" />
                    <span className="button-label">{ 'Réduire' }</span>
                </button>
            </div>
        </div>

        <a className="lmem-topbar-logo with-tooltip" href="">
            <img src={ imagesUrl + 'logo-lmem.svg' } alt="" />
            <span className="tooltip tooltip-right"><span>
                { 'Réduire le panneau comparatif' }
            </span></span>
        </a>
    </header>
);

AlternativeHeader.propTypes = {
    stylesUrl: PropTypes.string.isRequired,
};

export default AlternativeHeader;
