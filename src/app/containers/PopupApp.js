import React from 'react';
import { connect } from 'react-redux';

import SeeCurrentOffers from '../components/Editor/SeeCurrentOffers';
import * as alternativesActions from '../actions/offers';

function mapStateToProps(state) {
    return { state };
}

const mapDispatchToProps = alternativesActions; // { ...counterActions, ...};

const PopupApp = ({ state }) => (
    <SeeCurrentOffers state={state} />
);

export default connect(mapStateToProps, mapDispatchToProps)(PopupApp);
