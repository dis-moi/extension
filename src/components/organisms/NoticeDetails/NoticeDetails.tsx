import React, { PureComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Contributor, Button, BorderButton } from '../../atoms';
import Like from '../../atoms/icons/types/Like';
import Dislike from '../../atoms/icons/types/Dislike';
import Source from './Source/Source';
import Anchor from './Source/AnchorIcon';
import SourceURL from './Source/SourceURL';
import DetailsContainer from './DetailsContainer';
import DetailsContent from './DetailsContent';
import DetailsMeta from './DetailsMeta';
import DetailsDislike from './DetailsDislike';
import Message from './Message';
import Feedbacks from './Feedbacks';
import Date from './Date';
import { StatefulNotice } from '../../../app/lmem/notice';
import { format } from 'date-fns';
import IntentionIcon from '../../molecules/Type/IntentionIcon';

interface NoticeDetailsProps {
  notice: StatefulNotice;
  like: (id: number) => void;
  unlike: (id: number) => void;
  dislike: (id: number) => void;
  undislike: (id: number) => void;
  view?: (id: number) => void;
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
        state: { liked, disliked, dismissed }
      }
    } = this.props;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Date>Le {format(created, 'DD/MM/YYYY')}</Date>
            <Contributor>{contributor.name} :</Contributor>
            <IntentionIcon intention={intention} />
          </DetailsMeta>

          <Message>{message}</Message>
          {source && (
            <Source>
              <Anchor /> En savoir plus : <SourceURL>{source.url}</SourceURL>
            </Source>
          )}

          <Feedbacks>
            <Button onClick={this.handleLikeClick}>
              <Like active={liked} />
            </Button>
            <Button onClick={this.handleDislikeClick}>
              <Dislike active={disliked} />
            </Button>
          </Feedbacks>

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
      </DetailsContainer>
    );
  }
}

export default withRouter(NoticeDetails);
