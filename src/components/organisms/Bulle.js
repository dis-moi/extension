import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BulleContainer,
  BulleContent,
  BulleDeleted,
  Approves,
  Contributor,
  DeleteButton,
  OpenButton,
  Dislikes,
  Message,
  SourceURL,
  Feedbacks
} from '../atoms';
import { BulleTitle, BulleType } from '../molecules';

export default class Bulle extends PureComponent {
  static propTypes = {
    details: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    approves: PropTypes.number,
    dislikes: PropTypes.number,
    contributor: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    deleted: PropTypes.bool,
  }

  static defaultProps = {
    details: false,
    type: null,
    approves: 0,
    dislikes: 0,
    onDelete: () => { },
    deleted: false,
  }

  render() {
    const {
      type, message, contributor, onDelete, deleted
    } = this.props;
    return (
      <BulleContainer>
        <Fragment>
          {!deleted && <DeleteButton onClick={onDelete} />}
          <BulleContent to={!deleted && 'bulles/details'}>
            {deleted ? (
              <BulleDeleted>Cette bulle ne s’affichera plus !</BulleDeleted>
            ) : (
              <Fragment>
                <BulleType type={type} />
                <div>
                  <BulleTitle>{message}</BulleTitle>
                  <Contributor>
                      Par :
                      &nbsp;
                    {contributor}
                  </Contributor>
                </div>
                <OpenButton to="bulles/details" />
              </Fragment>
            )}
          </BulleContent>
        </Fragment>
      </BulleContainer>
    );
  }
}