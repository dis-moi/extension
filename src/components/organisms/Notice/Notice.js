import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Contributor,
  OpenButton,
  Button,
} from '../../atoms';
import Type from '../../molecules/Type/Type';
import Container from './Container';
import Content from './Content';
import Deleted from './Deleted';
import DeleteButton from './DeleteButton';
import Title from './Title';

export default class Notice extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    message: PropTypes.string.isRequired,
    contributor: PropTypes.string.isRequired,
    dismiss: PropTypes.func.isRequired,
    undismiss: PropTypes.func.isRequired,
    dismissed: PropTypes.bool,
    disliked: PropTypes.bool,
  };

  static defaultProps = {
    type: 'Other',
    dismissed: false,
  };

  render() {
    const {
      id, type, message, contributor, dismissed, disliked, dismiss, undismiss
    } = this.props;
    return (
      <Container>
        {!dismissed && !disliked
        && <DeleteButton onClick={() => dismiss(id)} />
        }
        <Content to={!dismissed && `notices/details/${id}`}>
          {dismissed || disliked ? (
            <Fragment>
              <Deleted>Cette notification ne s’affichera plus !</Deleted>
              <Button onClick={() => undismiss(id)}>Annuler</Button>
            </Fragment>
          ) : (
            <Fragment>
              <Type type={type} />
              <div>
                <Title>{message}</Title>
                <Contributor>
                      Par :
                      &nbsp;
                  {contributor}
                </Contributor>
              </div>
              <OpenButton />
            </Fragment>
          )}
        </Content>
      </Container>
    );
  }
}
