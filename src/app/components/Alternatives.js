import React, { Component, PropTypes } from 'react';


const styles = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: '225px',
    zIndex: 99999,
};

const Alternatives = ({recommendation, stylesUrl, imagesUrl}) => (
        <section id="lmem--alternatives--root" style={styles}>
            <link href='https://fonts.googleapis.com/css?family=Ubuntu:400,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css' />
            <link rel="stylesheet" href={stylesUrl} />

            <div className="main">
                <div className="wrapperframe">
                    <header className="sideframe lmem-header">
                        <div className="query-summary summary-contributor">
                            <h2 className="reco-contributor-title">{ 'Recommandation propos' + String.fromCharCode(233) + 'e par' }</h2>
                            <div className="reco-contributor-content">
                                <img src={ imagesUrl + "contributors/maarten.jpg" } />
                                <p>
                                    <strong>Maarten Samson</strong>
                                    <span>{ 'co-fondateur Le M' + String.fromCharCode(234) + 'me en Mieux.' }</span>
                                </p>
                            </div>
                        </div>
                    </header>
                    <div className="mainframe"><section className="mainframe-inner">
                        <a className="reco-summary-wrapper highlight" target="_blank" href={ recommendation.alternatives[0].url_to_redirect } >
                            <header className="summary-header reco-summary-header">
                               <h3 className="reco-summary-title">{ recommendation.title }</h3>
                               <ul className="summary-tags">
                                   {recommendation.filters.map(filter => <li><b className={ 'tag tag-' + filter.label }> {filter.description} </b></li>)}
                               </ul>
                            </header>
                            <div className="reco-summary-content">
                                <div className="reco-summary-content-innerwrapper">
                                    <div className="reco-summary-description summary-description">
                                        <p>{ recommendation.description }</p>
                                    </div>
                                    <div className="reco-summary-link-referral">
                                        <img src={ imagesUrl + "logo-lmem-new.svg" } />
                                        <span>{ recommendation.alternatives[0].url_to_redirect.replace(/^https?:\/\/(www.)?/, '') }</span>
                                    </div>
                                </div>
                                <div className="summary-link-checkout-wrapper">
                                    <span className="button summary-link-checkout with-right-arrow" target="_blank" href={ recommendation.alternatives[0].url_to_redirect } >
                                       <span className="button-label">
                                           { recommendation.alternatives[0].label }
                                       </span>
                                    </span>
                                </div>
                            </div>
                        </a>
                    </section></div>
                </div>

                <aside className="lmem-topbar fixed">
                    <div className="lmem-topbar-notification">

                        <div className="mainframe">
                            <div className="mainframe-inner">
                                <h1 className="lmem-topbar-title">
                                    <strong>{ 'Le M' + String.fromCharCode(234) + 'me en Mieux' }</strong>
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="button-wrapper">
                        <div className="button-directive">
                            <a title="" target="" className="button button-compact with-image">
                                <img src={ imagesUrl + 'arrow.svg' } className="lmem-controls-picto lmem-controls-close" />
                                <span className="button-label">{ 'R' + String.fromCharCode(233) + 'duire' }</span>
                            </a>
                        </div>
                    </div>

                    <a className="lmem-topbar-logo with-tooltip" href="">
                        <img src={ imagesUrl + 'logo-lmem.svg' } alt="" />
                        <span className="tooltip tooltip-right"><span>
                            { 'R' + String.fromCharCode(233) + 'duire le panneau comparatif' }
                        </span></span>
                    </a>
                </aside>

            </div>
        </section>
    );

Alternatives.propTypes = {
    recommendation: PropTypes.object.isRequired,
    stylesUrl: PropTypes.string.isRequired,
    imagesUrl: PropTypes.string.isRequired,
};

export default Alternatives;
