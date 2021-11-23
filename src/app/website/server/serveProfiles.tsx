import React from 'react';
import { renderToString } from 'react-dom/server';
import { AppContext } from './app';
import { renderAppToString } from '../../profiles/ssr';

// const normalizeAssets = assets => (Array.isArray(assets) ? assets : [assets]);

export default (ctx: AppContext) => {
  // let context = {};
  // let modules = [];
  // const assetsByChunkName = ctx.state.webpackStats.toJson().assetsByChunkName;

  const html = renderAppToString(ctx.request.url);

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <title>example</title>
      <!-- $-{normalizeAssets(assetsByChunkName.main)
        .filter(path => path.endsWith('.css'))
        .map(path => \`<link rel="stylesheet" href="$-{path}" />\`)
        .join('\n')} -->
  <body>
      <div id="main" style="height: 100%">${html}</div>
      <!-- $ {normalizeAssets(assetsByChunkName.main)
        .filter(path => path.endsWith('.js'))
        .map(path => \`<script src="$ {path}"></script>\`)
        .join('\n')}
      $ {normalizeAssets(assetsByChunkName.vendor)
        .filter(path => path.endsWith('.js'))
        .map(path => \`<script src="$ {path}"></script>\`)
        .join('\n')} -->
  </body>

  </html>`;
};
