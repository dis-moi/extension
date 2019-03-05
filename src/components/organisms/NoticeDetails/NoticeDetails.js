import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Contributor,
  Button,
  BorderButton
} from '../../atoms';
import { Like, Dislike } from '../../atoms/icons/types';
import Type from '../../molecules/Type/Type';
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
    dislike: PropTypes.func,
    undislike: PropTypes.func,
    disliked: PropTypes.oneOf([true, false, undefined]),
    contributor: PropTypes.string.isRequired,
    goBack: PropTypes.func,
    history: PropTypes.object,
  };

  static defaultProps = {
    type: 'Other',
    date: null,
    goBack: null,
    history: null
  };

  handleLikeClick = () => {
    const {
      liked, like, unlike, id
    } = this.props;
    if (liked) {
      unlike(id);
    } else {
      like(id);
    }
  };

  handleDislikeClick = () => {
    const {
      disliked, dislike, undislike, id
    } = this.props;
    if (disliked) {
      undislike(id);
    } else {
      dislike(id);
    }
  };

  get handleGoBack() {
    const { goBack, history } = this.props;

    return goBack || history.goBack;
  }

  render() {
    const {
      type, date, message, contributor, source, liked, disliked, dismissed
    } = this.props;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Date>
              Le {date}
            </Date>
            <Contributor>
              {contributor} :
            </Contributor>
            <Type type={type} />
          </DetailsMeta>
          <Message>{message}</Message>
          <Source>
            <Anchor />
              En savoir plus :
            <SourceURL>{source}</SourceURL>
          </Source>

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
            Merci pour votre retour, cette notification ne s’affichera plus
              <div>
                <Button onClick={this.handleDislikeClick}>Annuler</Button>
                <BorderButton onClick={this.handleGoBack}>OK</BorderButton>
              </div>
            </DetailsDislike>
          )}
        </DetailsContent>
      </DetailsContainer>
    );
  }
}

export default withRouter(NoticeDetails);
