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

const strip = (html) => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

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
      <NoticeContainer>
        {!dismissed && !disliked
        && <DeleteButton onClick={() => dismiss(id)} />
        }
        <NoticeContent to={!dismissed && `notices/details/${id}`}>
          {dismissed || disliked ? (
            <Fragment>
              <NoticeDeleted>Cette notification ne s’affichera plus !</NoticeDeleted>
              <Button onClick={() => undismiss(id)}>Annuler</Button>
            </Fragment>
          ) : (
            <Fragment>
              <NoticeType type={type} />
              <div>
                <NoticeTitle>{strip(message)}</NoticeTitle>
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
