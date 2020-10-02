import React from 'react';
import { ButtonWithIcon, Paragraph } from 'components/atoms';
import { Download } from 'components/atoms/icons';
import SidebarBox from './SidebarBox';

export default () => (
  <SidebarBox>
    <Paragraph>
      DisMoi permet aux internautes, médias et experts de vous informer
      directement sur les pages web que vous visitez.
    </Paragraph>

    <ButtonWithIcon className="bulle-installer">
      Ajouter à mon navigateur <Download />
    </ButtonWithIcon>
  </SidebarBox>
);
