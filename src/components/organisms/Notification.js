import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  NotificationContainer,
  NotificationHeader,
  NotificationMain,
  NotificationFooter,
  Title,
  CloseButton,
  Logo,
  MenuButton,
  BackButton
} from '../atoms';
import Bulle from './Bulle';

export default class Notification extends PureComponent {
    static propTypes = {
      title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      onClose: PropTypes.func,
      onOpenMenu: PropTypes.func,
      onBack: PropTypes.func,
      children: PropTypes.node.isRequired,
      details: PropTypes.bool,
    };

    static defaultProps = {
      details: false,
      onClose: () => {},
      onOpenMenu: () => {},
      onBack: () => {},
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
        title, onClose, onOpenMenu, onBack, details
      } = this.props;

      return (
        <NotificationContainer>
          <NotificationHeader>
            <Title>
              {details && (
                <Fragment>
                  <BackButton onClick={onBack} />
                  &nbsp;
                </Fragment>
              )}
              {title}
            </Title>
            <CloseButton onClick={onClose} />
          </NotificationHeader>
          <NotificationMain>
            {this.renderChildren()}
          </NotificationMain>
          <NotificationFooter>
            <Logo />
            <MenuButton onClick={onOpenMenu} />
          </NotificationFooter>
        </NotificationContainer>
      );
    }
}