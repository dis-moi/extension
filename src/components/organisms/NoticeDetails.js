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
import { Approval, Disapproval } from '../atoms/icons/types';
import { NoticeType, SourceURL } from '../molecules';


class NoticeDetails extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    date: PropTypes.string,
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    approves: PropTypes.number,
    dislikes: PropTypes.number,
    contributor: PropTypes.string.isRequired,
    approved: PropTypes.oneOf([true, false, undefined]),
    approve: PropTypes.func,
    disapprove: PropTypes.func,
    goBack: PropTypes.func,
    history: PropTypes.object,
  }

  static defaultProps = {
    type: 'Other',
    date: null,
    approves: 0,
    dislikes: 0,
    approved: undefined,
    approve: () => {},
    disapprove: () => {},
    goBack: null,
    history: null
  }

  handleApprove = () => {
    const { approve, id } = this.props;
    console.log(approve, id);
    approve(id);
  }

  handleDisapprove = () => {
    const { disapprove, id } = this.props;

    disapprove(id);
  }

  get handleGoBack() {
    const { goBack, history } = this.props;

    return goBack || history.goBack;
  }

  render() {
    const {
      type, date, message, contributor, source, approves, dislikes, approved
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
            <Button onClick={this.handleApprove}>
              <Approval active={approved === true} />
              {approves}
            </Button>
            <Button onClick={this.handleDisapprove}>
              <Disapproval active={approved === false} />
              {dislikes}
            </Button>
          </Feedbacks>

          {(approved === false) && (
            <NoticeDetailsDislike>
            Merci pour votre retour, cette notification ne s’affichera plus
              <div>
                <Button onClick={this.handleDisapprove}>Annuler</Button>
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
