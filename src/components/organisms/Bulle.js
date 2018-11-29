import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  BulleContainer,
  BulleContent,
  BulleDeleted,
  Approves,
  Contributor,
  DeleteButton,
  Dislikes,
  Message,
  SourceURL,
  BulleType,
  Feedbacks
} from '../atoms';
import BulleTitle from '../molecules/BulleTitle';

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
      onDelete: () => {},
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
              <BulleDeleted>Cette bulle ne s’affichera plus</BulleDeleted>
            </Fragment>
          ) : (
            <Fragment>
              {type && <BulleType type={type} /> }
              <BulleContent deleted={deleted}>
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
                    <BulleTitle>{message}</BulleTitle>
                    <Contributor>{contributor}</Contributor>
                  </Fragment>

                )}
              </BulleContent>
              {!details && <DeleteButton onClick={onDelete} />}
            </Fragment>
          )}
        </BulleContainer>
      );
    }
}