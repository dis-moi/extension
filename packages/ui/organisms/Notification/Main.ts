import styled from 'styled-components';
import { animated } from 'react-spring';

interface Props {
  /**
   * Préfixé par `$` pour rester côté style : la cible est `animated.main`,
   * donc un composant et non une balise. styled-components ne filtre les
   * props inconnues du DOM que pour les balises, et react-spring poserait
   * celle-ci sur le `<main>`, où React ne la reconnaît pas.
   */
  $hasNotices?: boolean;
}

export default styled(animated.main)<Props>`
  position: relative;
  height: 342px;
  background-color: ${(props) =>
    props.$hasNotices ? props.theme.noticeBg : props.theme.accountListBg};
`;
