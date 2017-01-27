import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active: false,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ active: true }), 10);
  }

  render() {
    const { children } = this.props;
    const { active } = this.state;
    const className = classnames('modal', { active });

    return (
      <div className={ className }>
        <div>
          { children }
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
