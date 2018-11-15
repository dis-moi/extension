import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuButton from '../../components/atoms/MenuButton';
import Title from '../../components/atoms/Title';
import Type from '../../components/atoms/Type';

import Header from '../../components/molecules/Header.js';
import Footer from '../../components/molecules/Footer.js';

import Notification from '../../components/views/Notification';

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
    <Notification>
      <Header>
        <Title>Mon super titre</Title>
      </Header>


      <Type>plop</Type>


      <Footer>
        <MenuButton>Ouvrir le menu</MenuButton>
      </Footer>
    </Notification>
  );
}

