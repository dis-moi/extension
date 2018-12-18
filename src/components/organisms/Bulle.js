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
      type, details, message, contributor, source, approves, dislikes, onDelete, deleted
    } = this.props;
    return (
      <BulleContainer>
        {deleted ? (
          <Fragment>
            <BulleContent>
              <BulleDeleted>Cette bulle ne s’affichera plus !</BulleDeleted>
            </BulleContent>
          </Fragment>
        ) : (
          <Fragment>
            {!details && <DeleteButton onClick={onDelete} />}
            <BulleContent deleted={deleted}>
              <BulleType type={type} />
              {details ? (
                <Fragment>
                  <Message>{message}</Message>
                  <SourceURL>{source}</SourceURL>

                  <Feedbacks>
                    <Approves>{approves}</Approves>
                    <Dislikes>{dislikes}</Dislikes>
                  </Feedbacks>
                </Fragment>
              ) : (
                <Fragment>
                  <div>
                    <BulleTitle>{message}</BulleTitle>
                    <Contributor>{contributor}</Contributor>
                  </div>
                  <OpenButton to="/details" />
                </Fragment>
              )}
            </BulleContent>
          </Fragment>
        )}
      </BulleContainer>
    );
  }
}