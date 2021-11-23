import { ParameterizedContext } from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

export const router = new Router();

const serveProfiles = (ctx: ParameterizedContext) => {
  {
    const { FACET, ROOT_DIR, NODE_ENV } = process.env;

    ctx.type = 'html';
    ctx.status = 200;
    ctx.body = fs.readFileSync(
      path.resolve(
        ROOT_DIR || '/',
        `build/${NODE_ENV}/profiles/${FACET}/index.html`
      )
    );
  }
};

router
  .get('/fr/eclaireurs', serveProfiles)
  .get('/fr/eclaireurs/:id/:name', serveProfiles);
