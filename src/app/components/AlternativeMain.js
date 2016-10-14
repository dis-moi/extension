import React, { Component, PropTypes } from 'react';

const AlternativeMain = ({ imagesUrl, recommendations }) => {
  console.log('recommendations', recommendations);

  // For now, this component is only capable of handling a single recommendation.
  // handling of several is TBD
  const recommendation = recommendations[0];
  const {visibility} = recommendation;

  const mainClass = visibility === 'private' ? 'preview' : undefined;

  return (<main className={mainClass}>
    <header className="sideframe lmem-header">
      <div className="query-summary summary-contributor">
        <h2 className="reco-contributor-title">{'Recommandation proposée par'}</h2>
        <div className="reco-contributor-content">
          <img role="presentation" src={recommendation.contributor.image} />
          <div>{recommendation.contributor.name}</div>
          <div>{recommendation.contributor.organization}</div>
        </div>
      </div>
    </header>

    <div className="separation-bar" />

    <a
      className="mainframe highlight"
      target="_blank"
      href={recommendation.alternatives[0].url_to_redirect}
    >
      <header className="summary-header reco-summary-header">
        <h3 className="reco-summary-title">{recommendation.title}</h3>
        <ul className="summary-tags">
          {recommendation.filters
            .map(filter =>
              <li><b className={'tag tag-' + filter.label}> {filter.description} </b></li>
            )
          }
        </ul>
      </header>
      <div className="reco-summary-content">
        <div className="reco-summary-content-innerwrapper">
          <div className="reco-summary-description summary-description">
            <p>{recommendation.description}</p>
          </div>
          <div className="reco-summary-link-referral">
            <img
              alt="Logo le même en mieux"
              src={'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(recommendation.alternatives[0].url_to_redirect)} />
            <span>{
              recommendation.alternatives[0].url_to_redirect.replace(/^https?:\/\/(www.)?/, '')
            }</span>
          </div>
        </div>
        <div className="summary-link-checkout-wrapper">
          <span
            className="button summary-link-checkout with-right-arrow"
            target="_blank"
            href={recommendation.alternatives[0].url_to_redirect}>
            <span className="button-label">
              {recommendation.alternatives[0].label}
            </span>
          </span>
        </div>
      </div>
    </a>
  </main>);
};

AlternativeMain.propTypes = {
  recommendations: PropTypes.array.isRequired,
  imagesUrl: PropTypes.string.isRequired
};

export default AlternativeMain;



