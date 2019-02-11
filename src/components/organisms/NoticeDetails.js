import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { sanitize } from 'dompurify';
import { withRouter } from 'react-router';
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
import { Like, Dislike } from '../atoms/icons/types';
import { NoticeType, SourceURL } from '../molecules';


class NoticeDetails extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    date: PropTypes.string,
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    like: PropTypes.func,
    unlike: PropTypes.func,
    liked: PropTypes.oneOf([true, false, undefined]),
    likes: PropTypes.number,
    dislike: PropTypes.func,
    undislike: PropTypes.func,
    disliked: PropTypes.oneOf([true, false, undefined]),
    dislikes: PropTypes.number,
    contributor: PropTypes.string.isRequired,
    goBack: PropTypes.func,
    history: PropTypes.object,
  }

  static defaultProps = {
    type: 'Other',
    date: null,
    goBack: null,
    history: null
  }

  handleLikeClick = () => {
    const { liked, like, unlike, id } = this.props;
    if (liked) {
      unlike(id);
    } else {
      like(id);
    }
  }

  handleDislikeClick = () => {
    const { disliked, dislike, undislike, id } = this.props;
    if (disliked) {
      undislike(id);
    } else {
      dislike(id);
    }
  }

  get handleGoBack() {
    const { goBack, history } = this.props;

    return goBack || history.goBack;
  }

  render() {
    const {
      type, date, message, contributor, source, liked, likes, disliked, dislikes,
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
            <SourceURL numberOfCharacters={37}>{source}</SourceURL>
          </Source>

          <Feedbacks>
            <Button onClick={this.handleLikeClick}>
              <Like active={liked} />
              {likes}
            </Button>
            <Button onClick={this.handleDislikeClick}>
              <Dislike active={disliked} />
              {dislikes}
            </Button>
          </Feedbacks>

          {(disliked) && (
            <NoticeDetailsDislike>
            Merci pour votre retour, cette notification ne s’affichera plus
              <div>
                <Button onClick={this.handleDislikeClick}>Annuler</Button>
                <BorderButton onClick={this.handleGoBack}>OK</BorderButton>
              </div>
            </NoticeDetailsDislike>
          )}
        </NoticeDetailsContent>
      </NoticeDetailsContainer>
    );
  }
}

export default withRouter(NoticeDetails);
