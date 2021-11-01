/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const React = require('react');

exports.onRenderBody = ({ pathname, setPostBodyComponents }) => {
  const homePage =
    pathname === '/' ||
    pathname === '/en/' ||
    process.env.NODE_ENV !== 'production';

  homePage &&
    setPostBodyComponents([
      <script
        key={1}
        src="https://code.createjs.com/1.0.0/createjs.min.js"
        type="text/javascript"
      />,
      <script key={2} src="/script/animation.js" type="text/javascript" />
    ]);
};
