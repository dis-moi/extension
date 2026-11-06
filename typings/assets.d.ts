/**
 * Les bundlers — Vite pour l'extension, webpack pour le site — transforment
 * l'import d'un fichier média en URL. TypeScript, lui, n'en sait rien et
 * signale un module introuvable. Ces déclarations lui donnent le type réel :
 * une chaîne.
 *
 * Elles vivaient dans `packages/extension/index.d.ts`, donc invisibles de
 * `packages/ui` qui importe pourtant la plupart de ces images.
 */
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
