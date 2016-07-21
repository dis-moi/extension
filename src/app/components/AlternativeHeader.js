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
        const tooltipButtonClassName = [
            'tooltip',
            reduced ? 'tooltip-left' : 'tooltip-bottom-right'
        ].join(' ');

        const deactivateMenu = deactivateMenuOpen ? (
            <div className="menu-wrapper menu-bottom-right">
                <div className="menu-content">
                    <ul className="menu-list">
                        <li>
                            <button className="not-button with-image" onClick={ e => onDeactivate({
                                where: DEACTIVATE_EVERYWHERE,
                                duration: SESSION_DEACTIVATE_DELAY
                            }) }>
                                <img className="lmem-controls-picto" src={ imagesUrl + 'power-timer.svg' } />
                                <span>Désactiver partout pour 30mins</span>
                            </button>
                        </li><li>
                            <button className="not-button with-image" onClick={ e => onDeactivate({
                                where: window.location && location.hostname,
                                duration: DEACTIVATE_WEBSITE_ALWAYS
                            }) }>
                                <img className="lmem-controls-picto" src={ imagesUrl + 'power-cross.svg' } />
                                <span>Désactiver sur ce site pour toujours</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        ) : undefined;

        const deactivateButtonOnClick = reduced ?
            e => onDeactivate({
                where: DEACTIVATE_EVERYWHERE,
                duration: SESSION_DEACTIVATE_DELAY
            }) :
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

                <nav>
                    <ul className="lmem-controls-list">
                        <li className="with-menu">
                            <div className="button-directive">
                                <button className="button button-compact with-tooltip"
                                        onClick={deactivateButtonOnClick}>
                                    <img src={ imagesUrl + 'power.svg' }
                                         className="lmem-controls-picto"/>
                                    <span className={tooltipButtonClassName}><span>
                                        Désactiver
                                    </span></span>
                                </button>
                            </div>
                            <div className="menu-directive">{ deactivateMenu }</div>
                        </li>
                    </ul>
                </nav>

                <div className="button-wrapper">
                    <div className="button-directive">
                        <button className="button button-compact with-image with-tooltip"
                                onClick={reduced ? onExtend : onReduce}>
                            <img src={ imagesUrl + 'arrow.svg' } className={ buttonButtonClassName }/>
                            <span className="button-label">{reduceButtonText}</span>
                            <span className={tooltipButtonClassName}><span>
                                {reduceButtonText}
                            </span></span>
                        </button>
                    </div>
                </div>

                <button className="lmem-topbar-logo with-tooltip not-button">
                    <img src={ imagesUrl + 'logo-lmem.svg' } alt="" />
                    <span className="tooltip tooltip-right"><span>
                        { reduceButtonText + ' le panneau comparatif' }
                    </span></span>
                </button>
            </header>
        )
    }
}

// AlternativeHeader.propTypes = {
//     stylesUrl: PropTypes.string.isRequired
// };

export default AlternativeHeader;
