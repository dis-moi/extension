import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import loadScript from './loadScript';
import playCoverAnimation, {
  AnimateRuntime,
  COVER_ANIMATION,
  StopAnimation,
} from './playCoverAnimation';

/**
 * Servis par le site depuis `packages/web/public/script/`. CreateJS doit être
 * chargé avant l'export Adobe Animate, qui s'y accroche dès son évaluation.
 */
const CREATEJS_SRC = '/script/createjs.min.js';
const ANIMATION_SRC = '/script/animationDisMoi.js';

const loadAnimateRuntime = async (): Promise<AnimateRuntime> => {
  await loadScript(CREATEJS_SRC);
  await loadScript(ANIMATION_SRC);

  return window as unknown as AnimateRuntime;
};

/**
 * Appelle `onVisible` la première fois que l'élément est affiché. Un élément
 * en `display: none` — l'animation sur mobile — ne l'est jamais : ses scripts
 * ne sont alors pas téléchargés du tout.
 */
const onceVisible = (element: Element, onVisible: () => void) => {
  if (typeof IntersectionObserver === 'undefined') {
    onVisible();
    return () => undefined;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      onVisible();
    }
  });
  observer.observe(element);

  return () => observer.disconnect();
};

const Canvas = styled.canvas`
  display: block;
  width: 100%;
  height: auto;
`;

export interface BrowserAnimationProps {
  className?: string;
  /** Les phrases que l'animation fait défiler dans ses bulles. */
  words: string[];
  language: string;
}

const BrowserAnimation = ({
  className,
  words,
  language,
}: BrowserAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // L'animation lit ses phrases une fois, au démarrage : elle est relancée
  // quand elles changent, et seulement à ce moment-là.
  const script = [language, ...words].join('\n');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    let stop: StopAnimation | undefined;
    let abandoned = false;

    const stopWatching = onceVisible(canvas, () => {
      loadAnimateRuntime()
        .then((runtime) => {
          if (!abandoned) {
            stop = playCoverAnimation(canvas, runtime, window.devicePixelRatio);
          }
        })
        // L'animation est décorative : sans elle, la page reste utilisable.
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    });

    return () => {
      abandoned = true;
      stopWatching();
      stop?.();
    };
  }, [script]);

  const wordsData = Object.fromEntries(
    words.map((word, index) => [`data-word${index + 1}`, word]),
  );

  return (
    <div className={className}>
      <Canvas
        ref={canvasRef}
        width={COVER_ANIMATION.width}
        height={COVER_ANIMATION.height}
        aria-hidden="true"
      />
      {/* Seul canal entre la page et le script généré, qui cherche cet id. */}
      <span id="variableWords" data-language={language} {...wordsData} />
    </div>
  );
};

export default BrowserAnimation;
