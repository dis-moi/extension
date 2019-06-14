import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Contributor, Button, BorderButton } from '../../atoms';
import ThumbUp from '../../atoms/icons/ThumbUp';
import ThumbDown from '../../atoms/icons/ThumbDown';
import Source from './Source/Source';
import SourceURL from './Source/SourceURL';
import DetailsContainer from './DetailsContainer';
import DetailsContent from './DetailsContent';
import DetailsMeta from './DetailsMeta';
import DetailsDislike from './DetailsDislike';
import Message from './Message';
import Feedbacks from './Feedbacks';
import Date from './Date';
import CenterContainer from './CenterContainer';
import { StatefulNotice } from '../../../app/lmem/notice';
import { format } from 'date-fns';
import IntentionIcon from '../../atoms/Intentions/IntentionIcon';

interface NoticeDetailsProps {
  notice: StatefulNotice;
  like: (id: number) => void;
  unlike: (id: number) => void;
  dislike: (id: number) => void;
  undislike: (id: number) => void;
  view?: (id: number) => void;
  followSource?: (id: number) => void;
  preview?: boolean;
}
class NoticeDetails extends PureComponent<
  NoticeDetailsProps & RouteComponentProps
> {
  handleLikeClick = () => {
    const { notice, like, unlike } = this.props;
    if (notice.state.liked) {
      unlike(notice.id);
    } else {
      like(notice.id);
    }
  };

  handleDislikeClick = () => {
    const {
      notice: {
        id,
        state: { disliked }
      },
      dislike,
      undislike
    } = this.props;
    if (disliked) {
      undislike(id);
    } else {
      dislike(id);
    }
  };

  handleFollowSource = () => {
    const {
      followSource,
      notice: { id }
    } = this.props;
    if (followSource) {
      followSource(id);
    }
  };

  componentDidMount(): void {
    const {
      view,
      notice: { id }
    } = this.props;
    if (view) {
      view(id);
    }
  }

  render() {
    const {
      notice: {
        intention,
        message,
        created,
        contributor,
        source,
        ratings: { likes, dislikes },
        state: { liked, disliked, dismissed }
      },
      preview
    } = this.props;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Date>Le {format(created, 'DD/MM/YYYY')}</Date>
            <Contributor>{contributor.name} :</Contributor>
            <IntentionIcon active intention={intention} />
          </DetailsMeta>

          <Message>{message}</Message>
          {source && (
            <Source>
              En savoir plus :{' '}
              <SourceURL onClick={this.handleFollowSource}>
                {source.url}
              </SourceURL>
            </Source>
          )}

          {!preview && (
            <Feedbacks>
              <Button onClick={this.handleLikeClick}>
                <ThumbUp filled={liked} />
                {likes}
              </Button>
              <Button onClick={this.handleDislikeClick}>
                <ThumbDown filled={disliked} />
                {dislikes}
              </Button>
            </Feedbacks>
          )}

          {(disliked || dismissed) && (
            <DetailsDislike>
              Merci pour votre retour, cette bulle ne s’affichera plus
              <div>
                <Button onClick={this.handleDislikeClick}>Annuler</Button>
                <BorderButton onClick={this.props.history.goBack}>
                  OK
                </BorderButton>
              </div>
            </DetailsDislike>
          )}
        </DetailsContent>

        {preview && (
          <CenterContainer>
            <Button>Modifier</Button>
            <BorderButton>Publier</BorderButton>
          </CenterContainer>
        )}
      </DetailsContainer>
    );
  }
}

export default withRouter(NoticeDetails);
