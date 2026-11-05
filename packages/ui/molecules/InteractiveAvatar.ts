import styled from 'styled-components';
import Avatar from './Avatar';

export default styled(Avatar)`
  position: relative;

  &:hover {
    cursor: pointer;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /**
       * Un voile noir à 29 %, comme à l'origine (0b708139). Un commit sur
       * tout autre chose (e83e19c6) a remplacé cette valeur par
       * \`theme.badge\`, qui n'a jamais été une couleur : c'est l'objet des
       * couleurs de la pastille du bouton de barre d'outils. La déclaration
       * produite était invalide et le survol n'avait plus aucun effet.
       */
      background-color: #000000;
      border-radius: 50%;
      opacity: 0.29;
    }
  }
`;
