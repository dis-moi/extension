import React from 'react';
import { withTheme } from 'styled-components';
import Background from './Background';
import intentionIcons from '../icons/IntentionsIcons';
import { IntentionStyle, Theme } from 'app/theme';
import { getTypeOrFallback, Intention } from 'app/lmem/intention';

interface Props {
  intention?: Intention;
  theme: Theme;
  active?: boolean;
  onClick?: () => void;
}
const IntentionIcon = ({ intention, theme, active, onClick }: Props) => {
  const Icon = getTypeOrFallback(intentionIcons)(intention);
  const style = getTypeOrFallback<IntentionStyle>(theme.intentions)(intention);

  return (
    <Background
      color={active ? style && style.background : theme.inactiveIntentionBg}
      onClick={onClick}
    >
      {Icon && <Icon filled={!active} stroked={!active} />}
    </Background>
  );
};

export default withTheme(IntentionIcon);
