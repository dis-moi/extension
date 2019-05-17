import React from 'react';
import { withTheme } from 'styled-components';
import Background from './Background';
import intentionIcons from '../../atoms/icons/types';
import { Theme } from 'app/theme';
import { getTypeOrFallback, Intention } from 'app/lmem/intention';

interface Style {
  background: string;
}
interface Props {
  intention?: Intention;
  theme: Theme;
}
const IntentionIcon = ({ intention, theme }: Props) => {
  const Icon = getTypeOrFallback(intentionIcons)(intention);
  const style = getTypeOrFallback<Style>(theme.intentions)(intention);

  return (
    <Background color={style && style.background}>
      {Icon && <Icon />}
    </Background>
  );
};

export default withTheme(IntentionIcon);
