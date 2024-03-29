/* eslint-disable no-console */
import path from 'path';
import Koa, { DefaultContext } from 'koa';
import serve from 'koa-static';
import * as Sentry from '@sentry/node';
import 'colors';
import { router } from './routes';

// eslint-disable-next-line @typescript-eslint/ban-types
export type AppState = {};

export type AppContext = DefaultContext;

export interface AppOptions {
  development?: boolean;
}

export const boot = async ({
  development = false
}: AppOptions = {}): Promise<void> => {
  const {
    PORT,
    FACET,
    FACET_NAME,
    ROOT_DIR,
    NODE_ENV,
    SENTRY_ENABLED
  } = process.env;

  console.log(`Démarrage du site ${FACET_NAME} ! ...`.blue);

  const app = new Koa<AppState, AppContext>();

  try {
    app.use(serve(path.resolve(ROOT_DIR as string, 'src/app/website/public')));
    app.use(
      serve(
        path.resolve(ROOT_DIR as string, `build/${NODE_ENV}/profiles/${FACET}`)
      )
    );
    app.use(router.routes());
  } catch (e) {
    if (SENTRY_ENABLED === 'true') {
      Sentry.captureException(e);
    } else {
      console.error(e);
    }
  }

  if (SENTRY_ENABLED === 'true') {
    app.on('error', (err, ctx) => {
      Sentry.withScope(function(scope) {
        scope.addEventProcessor(function(event) {
          return Sentry.Handlers.parseRequest(event, ctx.request);
        });
        Sentry.captureException(err);
      });
    });
  }

  const port = PORT || 8080;

  try {
    app.listen(port, () => {
      console.log(
        `Serveur ${FACET_NAME} en ligne (mode ${
          development ? 'développement' : 'production'
        }) sur le port ${port}`.green
      );
    });
  } catch (e) {
    if (SENTRY_ENABLED === 'true') {
      Sentry.captureException(e);
    } else {
      console.error(e);
    }
  }
};
