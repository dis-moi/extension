'use client';

/**
 * Frontière client de l'application des profils. Elle se rend désormais des
 * deux côtés : plus de `ssr: false`, donc un HTML complet pour les visiteurs
 * sans extension et pour les robots.
 */
export { default } from '../../components/ProfilesApp';
