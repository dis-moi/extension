import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SeeCurrentOffers from '../../components/Editor/SeeCurrentOffers';

import * as alternativesActions from '../../actions/offers';

function mapStateToProps(store) {
    return { store };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(alternativesActions, dispatch)
    };
};

const PopupApp = ({ store, actions }) => (
    <div style={{width: "600px"}}>
        <SeeCurrentOffers store={store} actions={actions}  />
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(PopupApp);
