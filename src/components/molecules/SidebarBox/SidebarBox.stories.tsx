import React from 'react';
import { storiesOf } from '@storybook/react';
import SidebarBox from './SidebarBox';
import { ButtonWithIcon, Link, List, Paragraph, Title2 } from '../../atoms';
import { Download } from '../../atoms/icons';

storiesOf('Components/Molecules/SidebarBox', module)
  .add('normal', () => (
    <SidebarBox>
      <Title2 as="h3">DisMoi ne ralentit pas votre navigateur</Title2>
      <Paragraph>
        Contrairement à d’autres extensions, DisMoi ne ralentit pas votre
        navigateur.
      </Paragraph>

      <Link>Plus de détails</Link>
    </SidebarBox>
  ))
  .add('with list', () => (
    <SidebarBox>
      <Title2 as="h3"> DisMoi respecte votre vie privée</Title2>
      <Paragraph>
        <List>
          <li>
            Nous ne collectons ni revendons{' '}
            <strong>aucune donnée personnelle</strong>
          </li>
          <li>
            Nous ne faisons <strong>aucun profilage</strong>
          </li>
        </List>
      </Paragraph>

      <Link>En savoir plus</Link>
    </SidebarBox>
  ))
  .add('with action', () => (
    <SidebarBox>
      <Paragraph>
        DisMoi permet aux internautes, médias et experts de vous informer
        directement sur les pages web que vous visitez.
      </Paragraph>

      <ButtonWithIcon className="bulle-installer">
        Ajouter à mon navigateur <Download />
      </ButtonWithIcon>
    </SidebarBox>
  ));
