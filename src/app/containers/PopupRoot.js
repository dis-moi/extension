import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import PopupApp from './PopupApp';

export default class PopupRoot extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    };

    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <PopupApp />
            </Provider>
        );
    }
}
