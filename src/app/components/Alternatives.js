import React, { Component, PropTypes } from 'react';

class Alternatives extends Component {

    styles() {
        return {
            position: "fixed",
            bottom: "0px",
            backgroundColor: "orange",
            width: "100%",
            padding: "20px",
            zIndex: 99999
        }
    }

    render() {
        return (
            <div style={this.styles()}>
                <h2>LMEM a une alternative à vous proposer</h2>
                <p>{this.props.alternative.description}</p>
                <a href={this.props.alternative.alternatives[0].url}>{this.props.alternative.alternatives[0].title}</a>
            </div>
        );
    }
}

Alternatives.propTypes = {
    alternative: PropTypes.object.isRequired,
};

export default Alternatives;
