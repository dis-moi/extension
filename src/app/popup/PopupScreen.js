import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CloseButton from '../../components/atoms/CloseButton';
import Logo from '../../components/atoms/Logo';
import MenuButton from '../../components/atoms/MenuButton';
import Title from '../../components/atoms/Title';
import Type from '../../components/atoms/Type';

import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import Main from '../../components/molecules/Main';

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
        <Title>2 messages pour cette page</Title>
        <CloseButton>
          <svg width="12" height="12">
            <g fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </g>
          </svg>
        </CloseButton>
      </Header>
      <Header>
        <Title>
          <svg width="7" height="12">
            <path fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.046 1L1 6.046 6.046 11" />
          </svg> &nbsp;
          Le Même en Mieux, il y a 8 mois
        </Title>
        <CloseButton>
          <svg width="12" height="12">
            <g fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </g>
          </svg>
        </CloseButton>
      </Header>
      <Header>
        <Title>Aucune de vos relations n’a créé de bulle pour cette page</Title>
        <CloseButton>
          <svg width="12" height="12">
            <g fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </g>
          </svg>
        </CloseButton>
      </Header>

      <Main>
        <Type>plop</Type>
      </Main>

      <Footer>
        <Logo>Bulles</Logo>
        <MenuButton>Afficher le menu</MenuButton>
      </Footer>
    </Notification>
  );
}

