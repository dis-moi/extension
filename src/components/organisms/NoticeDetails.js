import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  NoticeDetailsContainer,
  NoticeDetailsContent,
  NoticeDetailsMeta,
  Approves,
  Contributor,
  Dislikes,
  Message,
  Source,
  SourceURL,
  Feedbacks,
  Date,
  Truncated
} from '../atoms';
import { Anchor } from '../atoms/icons';
import { Approval, Disapproval } from '../atoms/icons/types';
import { NoticeType } from '../molecules';

export default class Notice extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    date: PropTypes.string,
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    approves: PropTypes.number,
    dislikes: PropTypes.number,
    contributor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    type: null,
    date: null,
    approves: 0,
    dislikes: 0,
  }

  render() {
    const {
      type, date, message, contributor, source, approves, dislikes
    } = this.props;
    return (
      <NoticeDetailsContainer>
        <NoticeDetailsContent>
          <NoticeDetailsMeta>
            <NoticeType type={type} />
            <div>
              <Date>
                    Le 
                    &nbsp;
                {date}
              </Date>
              <Contributor>
                {contributor}
                    &nbsp;
                    a écrit
              </Contributor>
            </div>
          </NoticeDetailsMeta>
          <Fragment>
            <Message>{message}</Message>
            <Source>
              <Anchor />
                    En savoir plus : 
                    &nbsp;
              <SourceURL>
                <Truncated numberOfCharacters={39} preserveWords={false}>
                  {source}
                </Truncated>
              </SourceURL>
            </Source>

            <Feedbacks>
              <Approves>
                <Approval /> 
                {approves}
              </Approves>
              <Dislikes>
                <Disapproval />
                {dislikes}
              </Dislikes>
            </Feedbacks>
          </Fragment>
        </NoticeDetailsContent>
      </NoticeDetailsContainer>
    );
  }
}