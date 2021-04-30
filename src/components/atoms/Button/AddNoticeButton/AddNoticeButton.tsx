import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link } from 'components/atoms';

const LinkNoNotice = styled(Link)`
  display: inline-block;
  padding: 3px 12px;
  color: ${props => props.theme.Button.default};
  font-weight: 900;
  font-size: 16px;
  line-height: 1;
  text-decoration: none;
  text-transform: none;
  background-color: #fff;
  border-radius: ${props => props.theme.radiusS};
  border: 2px solid ${props => props.theme.Button.default};

  &:hover {
    color: #fff;
    background-color: ${props => props.theme.Button.hover};
    border-color: ${props => props.theme.Button.hover};
  }
`;

export default () => {
  const { t } = useTranslation();
  return <LinkNoNotice to="/contribute">{t('action.post')}</LinkNoNotice>;
};
