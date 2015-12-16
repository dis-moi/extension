import React, { Component, PropTypes } from 'react';

class Alternatives extends Component {

    styles() {
        return {
            position: "fixed"
        }
    }

    render() {
        return (
            <div style={this.styles()}>
                <h2>LMEM a une alternative à vous proposer</h2>
            </div>
        );
    }
}

Counter.propTypes = {
    state: PropTypes.object.isRequired,
    tabId: PropTypes.number.isRequired
};

export default Alternatives;
