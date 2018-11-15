import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonClose from '../../components/atoms/ButtonClose';
import ButtonMenu from '../../components/atoms/ButtonMenu';
import Logo from '../../components/atoms/Logo';
import Title from '../../components/atoms/Title';
import Type from '../../components/atoms/Type';

import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';

import BulleDetails from '../../components/organisms/BulleDetails';

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
        <ButtonClose>
          <svg width="12" height="12">
            <g fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </g>
          </svg>
        </ButtonClose>
      </Header>
      <Header>
        <Title>
          <svg width="7" height="12">
            <path fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.046 1L1 6.046 6.046 11" />
          </svg> &nbsp;
          Le Même en Mieux, il y a 8 mois
        </Title>
        <ButtonClose>
          <svg width="12" height="12">
            <g fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </g>
          </svg>
        </ButtonClose>
      </Header>
      <Header>
        <Title>Aucune de vos relations n’a créé de bulle pour cette page</Title>
        <ButtonClose>
          <svg width="12" height="12">
            <g fill="none" fill-rule="evenodd" stroke="#787993" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path d="M1 1l10 10M11 1L1 11" />
            </g>
          </svg>
        </ButtonClose>
      </Header>

      <main>
        <BulleDetails>
          <Type>plop</Type>
          <Message>
          De nombreux clients mécontents de Pixmania et ses vendeurs s’expriment sur les réseaux sociaux depuis 2016. Les plaintes continuent en 2017 et 2018 si l’on se réfère au forum Que Choisir.
          </Message>

          <SourceURL>http://forum.que-choisir.org/pixmania-avis-1285</SourceURL>

          <Feedbacks>
            <Approves>21</Approves>
            <Dislikes>3</Dislikes>
          </Feedbacks>
        </BulleDetails>

        <BulleExcerpt>
          <Type>plop</Type>
          <Title>« De nombreux clients mécontents de ce… »</Title>
          <Contributor>Le Même en Mieux</Contributor>
          <ButtonDelete></ButtonDelete>
        </BulleExcerpt>

        <BulleDeleted>
          Cette bulle ne s’affichera plus
        </BulleDeleted>
        
        <BulleToAdd>
          Ajouter une bulle
        </BulleToAdd>
      </main>

      <Footer>
        <Logo>Bulles</Logo>
        <ButtonMenu>Afficher le menu</ButtonMenu>
      </Footer>
    </Notification>
  );
}

