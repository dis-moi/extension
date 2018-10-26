import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { findType } from '../../lmem/typeOfCriteria';

import Editor from './Editor';
import Contributor from './Contributor';
import Criteria from './Criteria';
import RecoDescription from './RecoDescription';
import FeedbackButtons from '../containers/Feedback';
import TypeIndicator from './TypeIndicator';
import { recommendation as RecommendationPropType } from '../../propTypes';


export default function RecoMain({
  recommendations, imagesUrl,
  onCheckOutResourceButton, onCheckOutResourceLink, onCheckOutAlternative, onCheckOutEditor,
}) {
  // For now, this component is only capable of handling a single recommendation.
  // handling of several is TBD
  const recommendation = recommendations[0];
  const {visibility} = recommendation;

  const mainClass = visibility === 'private' ? 'preview' : undefined;

  const typeOfRecommendation = findType(recommendation.criteria);

  return (
    <main className={mainClass}>
      <header className="sideframe lmem-header">
        <Editor
          editor={recommendation.resource.editor}
          author={recommendation.resource.author}
          onCheckOutEditor={onCheckOutEditor}
        />
        <Contributor contributor={recommendation.contributor} />
      </header>

      <div className="separation-bar" />

      <div
        className={classNames(
          'recommendation',
          'mainframe',
          'highlight',
          {'with-indicator': typeOfRecommendation}
        )}>
        {
          typeOfRecommendation
            ? <TypeIndicator recommendationType={ typeOfRecommendation } imagesUrl={ imagesUrl } />
            : undefined
        }

        <div className="reco-summary">
          <header className="summary-header reco-summary-header">
            <h3 className="reco-summary-title">
              <a target="_blank" rel="noopener noreferrer" href={recommendation.resource.url}>
                {recommendation.title}
              </a>
            </h3>

            <Criteria criteria={ recommendation.criteria } />
          </header>
          <div className="reco-summary-content">
            <div className="reco-summary-link-referral">
              <a 
                onClick={e => onCheckOutResourceLink(recommendation.resource)}
                target="_blank"
                rel="noopener noreferrer"
                href={recommendation.resource.url}>
                {recommendation.resource.url.replace(/\?.+$/, '')}
              </a>
            </div>
            <RecoDescription description={recommendation.description} />
          </div>
        </div>
        <div className="summary-link-checkout-wrapper">
          <a
            onClick={e => onCheckOutResourceButton(recommendation.resource)}
            href={recommendation.resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="button summary-link-checkout with-image">
            <img alt="" src={imagesUrl + 'read.svg'} />
            <span className="button-label">
              {recommendation.resource.label}
            </span>
          </a>
          { recommendation.alternatives && recommendation.alternatives[0] ? (
            <div>
              <small>ou bien</small>
              <a
                onClick={e => onCheckOutAlternative(recommendation.alternatives[0])}
                href={recommendation.alternatives[0].url_to_redirect}
                target="_blank"
                rel="noopener noreferrer"
                className="reco-alternative button summary-link-checkout with-image">
                <img alt="" src={imagesUrl + 'logo-bw.svg'} />
                <span className="button-label">
                  {recommendation.alternatives[0].label}
                </span>
              </a>
            </div>
          ) : undefined }
        </div>
      </div>

      <footer className="reco-feedback">
        <FeedbackButtons recoId={ recommendation.id } isApproved={ recommendation.isApproved } />
      </footer>
    </main>
  );
}

RecoMain.propTypes = {
  imagesUrl: PropTypes.string.isRequired,
  recommendations: PropTypes.arrayOf(RecommendationPropType).isRequired,
};
