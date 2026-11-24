'use client';

/**
 * Client boundary of the profiles application. It now renders on both
 * sides: no more `ssr: false`, hence complete HTML for visitors without the
 * extension and for the crawlers.
 */
export { default } from '../../components/ProfilesApp';
