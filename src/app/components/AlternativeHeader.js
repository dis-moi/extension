import React, { Component, PropTypes } from 'react';

const AlternativeHeader = ({imagesUrl, reduced, onExtend, onReduce}) => {
    const buttonText = reduced ? 'Agrandir' : 'Réduire';
    const buttonButtonClassName = [
        "lmem-controls-picto",
        reduced ? "lmem-controls-open" : "lmem-controls-close"
    ].join(' ');

    return (
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
                <button title={buttonText} className="button button-compact with-image" onClick={reduced ? onExtend : onReduce}>
                    <img src={ imagesUrl + 'arrow.svg' } className={ buttonButtonClassName } />
                    <span className="button-label">{buttonText}</span>
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
)};

AlternativeHeader.propTypes = {
    stylesUrl: PropTypes.string.isRequired,
};

export default AlternativeHeader;
