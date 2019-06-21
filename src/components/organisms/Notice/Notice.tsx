import React, { Fragment, PureComponent } from 'react';
import { stripHtml } from 'app/utils/stripHtml';
import { Contributor, OpenButton, Button } from '../../atoms';
import Container from './Container';
import Content from './Content';
import Deleted from './Deleted';
import DeleteButton from './DeleteButton';
import Title from './Title';
import { StatefulNotice } from '../../../app/lmem/notice';
import IntentionIcon from '../../molecules/Type/IntentionIcon';

interface Props {
  notice: StatefulNotice;
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
  truncateTitleAt?: number;
}

export default class Notice extends PureComponent<Props> {
  static defaultProps = {
    type: 'Other',
    dismissed: false,
    disliked: false,
    read: false,
    truncateTitleAt: Title.defaultProps.numberOfCharacters
  };

  onDismiss = () => {
    this.props.dismiss(this.props.notice.id);
  };

  onUndismiss = () => {
    this.props.undismiss(this.props.notice.id);
  };

  render() {
    const {
      notice: {
        id,
        intention,
        message,
        contributor,
        state: { dismissed, disliked, read }
      },
      truncateTitleAt
    } = this.props;
    return (
      <Container>
        {!dismissed && !disliked && <DeleteButton onClick={this.onDismiss} />}
        <Content
          to={dismissed ? undefined : `notices/details/${id}`}
          read={read}
        >
          {dismissed || disliked ? (
            <Fragment>
              <Deleted>Cette bulle ne s’affichera plus !</Deleted>
              <Button onClick={this.onUndismiss}>Annuler</Button>
            </Fragment>
          ) : (
            <Fragment>
              <IntentionIcon intention={intention} />
              <div>
                <Title numberOfCharacters={truncateTitleAt}>
                  {stripHtml(message)}
                </Title>
                <Contributor>Par : {contributor.name}</Contributor>
              </div>
              <OpenButton />
            </Fragment>
          )}
        </Content>
      </Container>
    );
  }
}
