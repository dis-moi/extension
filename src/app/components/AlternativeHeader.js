import React, { Component, PropTypes } from 'react';
import { DEACTIVATE_EVERYWHERE, DEACTIVATE_WEBSITE_ALWAYS, SESSION_DEACTIVATE_DELAY } from '../constants/preferences';



class AlternativeHeader extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            deactivateMenuOpen: false
        };
    }

    render() {
        const {props, state} = this;
        const {imagesUrl, reduced, onExtend, onReduce, onDeactivate} = props;
        const {deactivateMenuOpen} = state;

        const reduceButtonText = reduced ? 'Agrandir' : 'Réduire';
        const buttonButtonClassName = [
            "lmem-controls-picto",
            reduced ? "lmem-controls-open" : "lmem-controls-close"
        ].join(' ');
        const deactivateButtonStyle = {
            minWidth: "2rem"
        };

        const deactivateMenu = deactivateMenuOpen ? (
            <div>
                <button onClick={ e => onDeactivate({
                    where: DEACTIVATE_EVERYWHERE,
                    duration: SESSION_DEACTIVATE_DELAY
                }) }>Désactiver partout pour 30mins</button>
                <button onClick={ e => onDeactivate({
                    where: window.location && location.hostname,
                    duration: DEACTIVATE_WEBSITE_ALWAYS
                }) }>Désactiver pour ce site pour toujours</button>
            </div>
        ) : undefined;

        const deactivateButtonOnClick = reduced ?
            onDeactivateForSession :
            e => this.setState({deactivateMenuOpen: !deactivateMenuOpen});

        return (
            <header className="lmem-topbar fixed">
                <div className="lmem-topbar-notification">

                    <div className="mainframe">
                        <div className="mainframe-inner">
                            <h1 className="lmem-topbar-title">
                                <strong>{ 'Le Même en Mieux' }</strong>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="button-wrapper">
                    <div className="button-directive">
                        <button title="désactiver" className="button button-compact with-image" onClick={deactivateButtonOnClick} style={deactivateButtonStyle}>
                            <img src={ imagesUrl + 'power-symbol.svg' } className="lmem-controls-picto lmem-controls-close"/>
                        </button>
                    </div>
                    { deactivateMenu }
                </div>

                <div className="button-wrapper">
                    <div className="button-directive">
                        <button title={reduceButtonText} className="button button-compact with-image" onClick={reduced ? onExtend : onReduce}>
                            <img src={ imagesUrl + 'arrow.svg' } className={ buttonButtonClassName } />
                            <span className="button-label">{reduceButtonText}</span>
                        </button>
                    </div>
                </div>

                <a className="lmem-topbar-logo with-tooltip" href="">
                    <img src={ imagesUrl + 'logo-lmem.svg' } alt="" />
                    <span className="tooltip tooltip-right"><span>
                        { 'Réduire le panneau comparatif' }
                    </span></span>
                </a>
            </header>
        )
    }
}

AlternativeHeader.propTypes = {
    stylesUrl: PropTypes.string.isRequired
};

export default AlternativeHeader;
