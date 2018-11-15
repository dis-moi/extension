import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/01-atoms/Button';
import Type from '../../components/01-atoms/Type';
import UiTitle from '../../components/01-atoms/UiTitle';
import MenuButton from '../../components/01-atoms/MenuButton';
import TopBar from '../../components/02-molecules/TopBar.js';
import BottomBar from '../../components/02-molecules/BottomBar.js';
import Notification from '../../components/04-pages/Notification';

export default function PopupScreen({ imagesUrl, openPrefScreenAbout, onClick }) {
  function onClickHandler(e) {
    onClick({
      name: e.currentTarget.textContent,
      href: e.currentTarget.href,
    });
  }

  function onOpenPrefsHandler(e) {
    onClick({
      name: e.currentTarget.textContent,
    });
    openPrefScreenAbout();
  }

  return (
    <div className="lmem-popup-content">
      <h2>Atoms</h2>
      Type: 
      <Type>plop</Type>

      UiTitle:
      <UiTitle>Le titre qui va bien</UiTitle>

      MenuButton: 
      <MenuButton>Ouvrir le menu</MenuButton>
      
      <h2>Molecules</h2>
      TopBar:
      <TopBar>
        
      </TopBar>

      BottomBar:
      <BottomBar></BottomBar>

      <Notification>
        TopBar
        BottomBar
      </Notification>


      <section className="popup-highlight">
        <p>
          Si l’assistant ne s’affiche pas en bas de page, c’est qu’aucune de vos sources de recommandation
          n’a posté de message sur cette page.
        </p>
        <footer className="lmem-popup-footer">
          <a className="with-image" href="https://choisir.lmem.net/apparition-assistant/" target="_blank" rel="noopener noreferrer" onClick={onClickHandler}>
            <img alt="" className="picto" src={imagesUrl + 'info.svg'} />
            <span>Découvrir où et quand l’assistant s’affiche</span>
          </a>
          <a className="with-image" href="https://choisir.lmem.net/demander-un-conseil/" target="_blank" rel="noopener noreferrer" onClick={onClickHandler}>
            <img alt="" className="picto" src={imagesUrl + 'discuss.svg'} />
            <span>Demander de l’aide sur un forum</span>
          </a>
        </footer>
      </section>
      <nav className="lmem-popup-controls">
        <ul>
          <li>
            <a
              className="button-hollow with-image"
              href="https://form.jotformeu.com/82702852284358"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClickHandler}>
              <img
                alt=""
                style={{
                  transform: 'rotate(45deg) scale(.9)'
                }}
                className="picto"
                src={imagesUrl + 'close.svg'} />
              <span>Poster un nouveau message</span>
            </a>
          </li>
          <li>
            <a className="button-hollow with-image" onClick={onOpenPrefsHandler} href>
              <img alt="" className="picto" src={imagesUrl + 'settings.svg'} />
              <span>Préférences</span>
            </a>
          </li>
          <li>
            <a className="button-hollow with-image" onClick={onClickHandler} href="https://choisir.lmem.net/questions-frequentes-aide/" target="_blank" rel="noopener noreferrer">
              <img alt="" className="picto" src={imagesUrl + 'help.svg'} />
              <span>Questions fréquentes, aide</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

