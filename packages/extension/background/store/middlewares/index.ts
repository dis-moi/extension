import { Action } from 'redux';
import { createLogger } from 'redux-logger';
import sagaMiddleware from './saga';

export { sagaMiddleware };

/**
 * Le journal s'adresse à quelqu'un qui regarde une console pendant qu'il
 * développe. Il était posé sans condition : dans un paquet publié, il
 * déversait l'état entier du magasin dans la console de chaque utilisateur, à
 * chaque action, et en coûtait le temps.
 */
const whileDeveloping = process.env.NODE_ENV !== 'production';

export default [
  sagaMiddleware,
  ...(whileDeveloping
    ? [
        createLogger({
          level: 'info',
          collapsed: true,
          titleFormatter: (
            action: Action,
            time: string,
            took: number,
          ): string =>
            `[BACKGROUND] @ ${time} ${action.type} (in ${took.toFixed(2)} ms)`,
        }),
      ]
    : []),
];
