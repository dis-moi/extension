import React from 'react';
import { withTheme } from 'styled-components';
import Background from './Background';
import intentionIcons from '../../atoms/icons/IntentionsIcons';
import { Theme } from 'app/theme';
import { getTypeOrFallback, Intention } from 'app/lmem/intention';

interface Style {
  background: string;
}
interface Props {
  intention?: Intention;
  theme: Theme;
  active?: boolean;
}
const IntentionIcon = ({ intention, theme, active }: Props) => {
  const Icon = getTypeOrFallback(intentionIcons)(intention);
  const style = getTypeOrFallback<Style>(theme.intentions)(intention);

  return (
    <Background
      color={active ? style && style.background : theme.inactiveIntentionBg}
    >
      {Icon && <Icon filled={!active} />}
    </Background>
  );
};

export default withTheme(IntentionIcon);
