import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  NoticeContainer,
  NoticeContent,
  NoticeDeleted,
  Contributor,
  DeleteButton,
  OpenButton,
} from '../atoms';
import { NoticeTitle, NoticeType } from '../molecules';

const to = 'notices/details';

export default class Notice extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    contributor: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    deleted: PropTypes.bool,
  }

  static defaultProps = {
    type: null,
    onDelete: () => { },
    deleted: false,
  }

  render() {
    const {
      type, message, contributor, onDelete, deleted
    } = this.props;
    return (
      <NoticeContainer>
        {!deleted && <DeleteButton onClick={onDelete} />}
        <NoticeContent to={!deleted && to}>
          {deleted ? (
            <NoticeDeleted>Cette notification ne s’affichera plus !</NoticeDeleted>
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
              <OpenButton to={to} />
            </Fragment>
          )}
        </NoticeContent>
      </NoticeContainer>
    );
  }
}