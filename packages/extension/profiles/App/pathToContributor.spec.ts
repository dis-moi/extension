import { expect } from 'chai';
import pathToContributor from './pathToContributor';

/**
 * Le chemin de la liste était lu sur le singleton global d'i18next. Depuis que
 * le site crée une instance par rendu, ce singleton n'est plus initialisé :
 * `t()` rendait `undefined`, le chemin devenait relatif, et les cent
 * soixante-dix-huit liens de la page des profils menaient à une 404.
 *
 * Il est maintenant donné par celui qui l'affiche, et ces exemples
 * n'initialisent rien : s'ils passent, c'est qu'aucune variable globale n'est
 * en jeu.
 */
describe('pathToContributor', () => {
  it('place le contributeur sous le chemin de la liste', () => {
    expect(
      pathToContributor(
        { id: 42, name: 'Jean Dupont' } as never,
        '/fr/profils',
      ),
    ).to.equal('/fr/profils/42/Jean-Dupont');
  });

  it('suit la langue du chemin qu’on lui donne', () => {
    expect(
      pathToContributor(
        { id: 16, name: 'Le Même en Mieux' } as never,
        '/en/guides',
      ),
    ).to.equal('/en/guides/16/Le-Meme-en-Mieux');
  });

  it('rend un chemin absolu, pour qu’il ne se résolve pas contre la page courante', () => {
    // C'est la forme relative qui a causé la panne : react-router résout
    // « 42/Jean-Dupont » contre « /fr/profils » et en retire le dernier
    // segment, d'où « /fr/42/Jean-Dupont ».
    expect(
      pathToContributor(
        { id: 42, name: 'Jean Dupont' } as never,
        '/fr/profils',
      ),
    ).to.match(/^\/fr\/profils\//);
  });
});
