const pending = new Map<string, Promise<void>>();

const appendScript = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => {
      script.remove();
      reject(new Error(`Unable to load script ${src}`));
    });
    document.head.appendChild(script);
  });

/**
 * Charge un script classique — de ceux qui posent des globales, et qu'on ne
 * peut donc pas importer — une seule fois par adresse. Un échec n'est pas
 * retenu : l'appel suivant retente.
 */
const loadScript = (src: string): Promise<void> => {
  const known = pending.get(src);
  if (known) {
    return known;
  }

  const loading = appendScript(src).catch((error) => {
    pending.delete(src);
    throw error;
  });
  pending.set(src, loading);

  return loading;
};

export default loadScript;
