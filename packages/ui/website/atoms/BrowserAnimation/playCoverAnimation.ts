/**
 * Identifiants inscrits par Adobe Animate dans le script exporté
 * (`animationDisMoi.js`). Ils changent si l'animation est réexportée depuis
 * son fichier source.
 */
export const COVER_ANIMATION = {
  compositionId: '5ED811F4CA4D4A1082E6963D6B77B249',
  symbol: 'dismoiwebsitecoveranimation',
  // Connues d'avance pour réserver la place du canvas avant le chargement.
  width: 440,
  height: 300,
} as const;

interface Stage {
  scaleX: number;
  scaleY: number;
  addChild(clip: unknown): void;
  removeAllChildren(): void;
}

interface AnimationLibrary {
  properties: { width: number; height: number; fps: number };
  Stage: new (canvas: HTMLCanvasElement) => Stage;
  [COVER_ANIMATION.symbol]: new () => unknown;
}

/** Les deux globales sur lesquelles repose un export Adobe Animate. */
export interface AnimateRuntime {
  createjs: {
    Ticker: {
      framerate: number;
      addEventListener(type: 'tick', listener: Stage): void;
      removeEventListener(type: 'tick', listener: Stage): void;
    };
  };
  AdobeAn: {
    getComposition(id: string): { getLibrary(): AnimationLibrary } | undefined;
  };
}

export type StopAnimation = () => void;

const getLibrary = ({ AdobeAn }: AnimateRuntime): AnimationLibrary => {
  const composition = AdobeAn.getComposition(COVER_ANIMATION.compositionId);
  if (!composition) {
    throw new Error(
      `Cover animation: composition ${COVER_ANIMATION.compositionId} not found, the loaded script is not the expected export.`,
    );
  }

  return composition.getLibrary();
};

/**
 * Joue l'animation de couverture dans `canvas` et rend de quoi l'arrêter.
 *
 * Le canvas reçoit la taille de la composition multipliée par la densité de
 * l'écran ; sa taille affichée, elle, reste l'affaire de la feuille de style.
 */
const playCoverAnimation = (
  canvas: HTMLCanvasElement,
  runtime: AnimateRuntime,
  pixelRatio = 1,
): StopAnimation => {
  const library = getLibrary(runtime);
  const { Ticker } = runtime.createjs;
  const { width, height, fps } = library.properties;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;

  const stage = new library.Stage(canvas);
  stage.scaleX = pixelRatio;
  stage.scaleY = pixelRatio;
  stage.addChild(new library[COVER_ANIMATION.symbol]());

  Ticker.framerate = fps;
  Ticker.addEventListener('tick', stage);

  return () => {
    Ticker.removeEventListener('tick', stage);
    stage.removeAllChildren();
  };
};

export default playCoverAnimation;
