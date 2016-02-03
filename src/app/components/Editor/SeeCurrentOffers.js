import React, { Component, PropTypes } from 'react';

class SeeCurrentOffers extends React.Component {

    state = { displayIt: false };

    toggleDisplay(){
        this.setState({ displayIt: !this.state.displayIt });
    }

    prettyPrintOffers(offers){
        return JSON.stringify(offers,null,2);
    }

    render () {
        const { state: reduxStore } = this.props;

        return (
            <div>
                <a href="#" onClick={(e)=>(this.toggleDisplay() && e.preventDefault())}>Display current offers</a>
                {(()=>(this.state.displayIt ? <pre style={{textAlign: "left"}}>{this.prettyPrintOffers(reduxStore.offers)}</pre> : ''))()}
            </div>
        );
    }
}

SeeCurrentOffers.propTypes = {
    state: PropTypes.object.isRequired
};


export default SeeCurrentOffers;
