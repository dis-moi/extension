import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  NoticeContainer,
  NoticeContent,
  NoticeDeleted,
  Contributor,
  DeleteButton,
  OpenButton,
  Button,
} from '../atoms';
import { NoticeTitle, NoticeType } from '../molecules';

export default class Notice extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    contributor: PropTypes.string.isRequired,
    dismiss: PropTypes.func,
    dismissed: PropTypes.bool,
  }

  static defaultProps = {
    type: null,
    dismiss: () => {},
    dismissed: false,
  }

  handleDismiss = () => {
    const { dismiss, id } = this.props;
    console.log(dismiss, id);
    dismiss(id);
  }

  render() {
    const {
      id, type, message, contributor, dismissed
    } = this.props;
    return (
      <NoticeContainer>
        {!dismissed && <DeleteButton onClick={this.handleDismiss} />}
        <NoticeContent to={!dismissed && `notices/details/${id}`}>
          {dismissed ? (
            <Fragment>
              <NoticeDeleted>Cette notification ne s’affichera plus !</NoticeDeleted>
              <Button>Annuler</Button>
            </Fragment>
          ) : (
            <Fragment>
              <NoticeType type={type} />
              <div>
                <NoticeTitle>{message}</NoticeTitle>
                <Contributor>
                      Par :
                      &nbsp;
                  {contributor}
                </Contributor>
              </div>
              <OpenButton />
            </Fragment>
          )}
        </NoticeContent>
      </NoticeContainer>
    );
  }
}