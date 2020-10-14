import React from 'react';
import styled from 'styled-components';
import { ExternalLink, List, Title2 } from 'components/atoms';
import SidebarBox from './SidebarBox';
import { WEBSITE_DOMAIN } from 'app/lmem';

const Ul = styled(List)`
  padding-left: 0;
`;

const ListItem = styled.li`
  line-height: initial;
  list-style-type: none;

  & + & {
    margin-top: 6px;
  }
`;

export default () => (
  <SidebarBox>
    <Title2 as="h3">DisMoi respecte votre vie privée</Title2>
    <Ul>
      <ListItem>
        Nous ne collectons ni revendons{' '}
        <strong>aucune donnée personnelle</strong>
      </ListItem>
      <ListItem>
        Nous ne faisons <strong>aucun profilage</strong>
      </ListItem>
    </Ul>

    <ExternalLink href={`https://${WEBSITE_DOMAIN}/vie-privee/`}>
      En savoir plus
    </ExternalLink>
  </SidebarBox>
);
