import React, { Component, PropTypes } from 'react';

const AlternativeMain = ({imagesUrl, recommendation}) => (
    <main className="main">
        <div className="wrapperframe">
            <header className="sideframe lmem-header">
                <div className="query-summary summary-contributor">
                    <h2 className="reco-contributor-title">{ 'Recommandation proposée par' }</h2>
                    <div className="reco-contributor-content">
                        <img src={ imagesUrl + "contributors/maarten.jpg" } />
                        <p>
                            <strong>Maarten Samson</strong>
                            <span>{ 'co-fondateur Le Même en Mieux.' }</span>
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
    </main>
);

AlternativeMain.propTypes = {
    recommendation: PropTypes.object.isRequired,
    imagesUrl: PropTypes.string.isRequired,
};

export default AlternativeMain;



