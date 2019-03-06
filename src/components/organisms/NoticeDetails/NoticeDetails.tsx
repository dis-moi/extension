import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Contributor, Button, BorderButton } from "../../atoms";
import Like from "../../atoms/icons/types/Like";
import Dislike from "../../atoms/icons/types/Dislike";
import Type from "../../molecules/Type/Type";
import Source from "./Source/Source";
import Anchor from "./Source/AnchorIcon";
import SourceURL from "./Source/SourceURL";
import DetailsContainer from "./DetailsContainer";
import DetailsContent from "./DetailsContent";
import DetailsMeta from "./DetailsMeta";
import DetailsDislike from "./DetailsDislike";
import Message from "./Message";
import Feedbacks from "./Feedbacks";
import Date from "./Date";
import { NoticeType } from "../../../app/lmem/noticeType";

interface Props {
  id: number;
  type: NoticeType;
  date: string;
  message: string;
  source: string;
  contributor: string;
  like: (id: number) => void;
  unlike: (id: number) => void;
  liked?: boolean;
  dislike: (id: number) => void;
  undislike: (id: number) => void;
  disliked?: boolean;
  dismissed?: boolean;
}
class NoticeDetails extends PureComponent<Props & RouteComponentProps> {
  handleLikeClick = () => {
    const { liked, like, unlike, id } = this.props;
    if (liked) {
      unlike(id);
    } else {
      like(id);
    }
  };

  handleDislikeClick = () => {
    const { disliked, dislike, undislike, id } = this.props;
    if (disliked) {
      undislike(id);
    } else {
      dislike(id);
    }
  };

  render() {
    const {
      type,
      date,
      message,
      contributor,
      source,
      liked,
      disliked,
      dismissed
    } = this.props;

    return (
      <DetailsContainer>
        <DetailsContent>
          <DetailsMeta>
            <Date>
              Le &nbsp;
              {date}
            </Date>
            <Contributor>
              {contributor}
              &nbsp; :
            </Contributor>
            <Type type={type} />
          </DetailsMeta>
          <Message>{message}</Message>
          <Source>
            <Anchor />
            En savoir plus : &nbsp;
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
