import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NotificationMain } from '../atoms';
import Bulle from './Bulle';
import { NotificationHeader } from '../molecules';

export default class Notification extends PureComponent {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onClose: PropTypes.func,
    onBack: PropTypes.func,
    children: PropTypes.node.isRequired,
    details: PropTypes.bool,
    bulles: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    details: false,
    onClose: () => { },
    onBack: null,
    bulles: false,
  };

  renderChildren() {
    const { children, details } = this.props;

    return React.Children.map(children, (child) => {
      if (Object.prototype.isPrototypeOf.call(Bulle, child.type)) {
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
      title, onClose, onBack, bulles
    } = this.props;

    return (
      <Fragment>
        <NotificationHeader title={title} onClose={onClose} onBack={onBack} />
        <NotificationMain bulles={bulles}>
          {this.renderChildren()}
        </NotificationMain>
      </Fragment>
    );
  }
}