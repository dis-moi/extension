/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it

/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react');
const { getFacet } = require('../../libs/facets/getFacet');

exports.onRenderBody = ({ pathname, setPostBodyComponents }) => {
  const homePage =
    pathname === '/' ||
    pathname === '/en/' ||
    process.env.NODE_ENV !== 'production';

  const facet = getFacet();

  homePage &&
    setPostBodyComponents([
      <script
        key={1}
        src="https://code.createjs.com/1.0.0/createjs.min.js"
        type="text/javascript"
      />,
      facet === 'lmel' ? (
        <script key={2} src="/script/animationLMEL.js" type="text/javascript" />
      ) : (
        <script
          key={2}
          src="/script/animationDisMoi.js"
          type="text/javascript"
        />
      )
    ]);
};
