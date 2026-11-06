/**
 * Vrai dans un navigateur, faux pendant un rendu serveur.
 *
 * Le même code rend les profils des deux côtés : ce prédicat marque les
 * endroits où la différence est assumée, plutôt que de laisser chacun
 * réinventer son `typeof window`.
 */
const isBrowser = (): boolean => typeof window !== 'undefined';

export default isBrowser;
