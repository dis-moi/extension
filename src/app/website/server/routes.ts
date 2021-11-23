import Router from 'koa-router';
import serveProfiles from './serveProfiles';

export const router = new Router();

router.get('*', async (ctx, next) => {
  ctx.body = serveProfiles(ctx);
});
