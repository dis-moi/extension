import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import en from '../../../libs/i18n/resources/en/extension.json';
import fr from '../../../libs/i18n/resources/fr/extension.json';

export const router = new Router();

const serveProfiles = (ctx: ParameterizedContext) => {
  const { FACET, ROOT_DIR, NODE_ENV } = process.env;

  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = fs.readFileSync(
    path.resolve(
      ROOT_DIR || '/',
      `build/${NODE_ENV}/profiles/${FACET}/index.html`
    )
  );
};

router
  .get(`/en${en.path.profiles.contributors}/:id?/:name?`, serveProfiles)
  .get(`/fr${fr.path.profiles.contributors}/:id?/:name?`, serveProfiles)
  .get(`/en${en.path.profiles.subscriptions}`, serveProfiles)
  .get(`/fr${fr.path.profiles.subscriptions}`, serveProfiles)
  .get(`${fr.path.profiles.contributors}/:id?/:name?`, serveProfiles)
  .get(`${fr.path.profiles.contributors}`, serveProfiles)
  .get(`${fr.path.profiles.subscriptions}`, serveProfiles);
