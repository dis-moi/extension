import React, { Fragment, PureComponent } from 'react';
import { NoticeType } from 'app/lmem/noticeType';
import { stripHtml } from 'app/utils/stripHtml';
import { Contributor, OpenButton, Button } from '../../atoms';
import Type from '../../molecules/Type/Type';
import Container from './Container';
import Content from './Content';
import Deleted from './Deleted';
import DeleteButton from './DeleteButton';
import Title from './Title';

interface Props {
  id: number;
  type: NoticeType;
  message: string;
  contributor: string;
  dismiss: (id: number) => void;
  undismiss: (id: number) => void;
  dismissed: boolean;
  disliked: boolean;
  read: boolean;
}

export default class Notice extends PureComponent<Props> {
  static defaultProps = {
    type: 'Other',
    dismissed: false,
    disliked: false,
    read: false
  };

  onDismiss = () => {
    this.props.dismiss(this.props.id);
  };

  onUndismiss = () => {
    this.props.undismiss(this.props.id);
  };

  render() {
    const {
      id,
      type,
      message,
      contributor,
      dismissed,
      disliked,
      read
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
              <Type type={type} />
              <div>
                <Title>{stripHtml(message)}</Title>
                <Contributor>Par : {contributor}</Contributor>
              </div>
              <OpenButton />
            </Fragment>
          )}
        </Content>
      </Container>
    );
  }
}
