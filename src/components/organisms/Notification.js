import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NotificationMain } from '../atoms';
import Notice from './Notice';
import { NotificationHeader } from '../molecules';

export default class Notification extends PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClose: PropTypes.func,
    onBack: PropTypes.func,
    children: PropTypes.node.isRequired,
    details: PropTypes.bool,
    notices: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    details: false,
    onClose: () => { },
    onBack: null,
    notices: false,
  };

  renderChildren() {
    const { children, details } = this.props;

    return React.Children.map(children, (child) => {
      if (Object.prototype.isPrototypeOf.call(Notice, child.type)) {
        return React.cloneElement(child, {
          ...child.props,
          details,
        });
      }

      return child;
    });
  }

  render() {
    const {
      title, onClose, onBack, notices
    } = this.props;

    return (
      <Fragment>
        <NotificationHeader title={title} onClose={onClose} onBack={onBack} />
        <NotificationMain notices={notices}>
          {this.renderChildren()}
        </NotificationMain>
      </Fragment>
    );
  }
}