import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  NoticeDetailsContainer,
  NoticeDetailsContent,
  NoticeDetailsMeta,
  NoticeDetailsDislike,
  Contributor,
  Message,
  Source,
  Feedbacks,
  Date,
  Button,
  BorderButton
} from '../atoms';
import { Anchor } from '../atoms/icons';
import { Approval, Disapproval } from '../atoms/icons/types';
import {NoticeType, SourceURL} from '../molecules';

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
            <Date>
              Le
              &nbsp;
              {date}
            </Date>
            <Contributor>
              {contributor}
              &nbsp;
              :
            </Contributor>
            <NoticeType type={type} />
          </NoticeDetailsMeta>
          <Message>{message}</Message>
          <Source>
            <Anchor />
              En savoir plus :
              &nbsp;
            <SourceURL numberOfCharacters={39}>{source}</SourceURL>
          </Source>

          <Feedbacks>
            <Button>
              <Approval />
              {approves}
            </Button>
            <Button>
              <Disapproval />
              {dislikes}
            </Button>
          </Feedbacks>

          <NoticeDetailsDislike>
            Merci pour votre retour, cette bulle ne s’affichera plus

            <div>
              <Button>Annuler</Button>
              <BorderButton>OK</BorderButton>
            </div>

          </NoticeDetailsDislike>
        </NoticeDetailsContent>
      </NoticeDetailsContainer>
    );
  }
}