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
  active?: boolean;
  clicked?: boolean;
}
const IntentionIcon = ({ intention, theme, active, clicked }: Props) => {
  const Icon = getTypeOrFallback(intentionIcons)(intention);
  const style = getTypeOrFallback<Style>(theme.intentions)(intention);

  return (
    <Background color={active ? style && style.background : '#f00'}>
      {Icon && <Icon active={active} clicked={clicked} />}
    </Background>
  );
};

export default withTheme(IntentionIcon);
