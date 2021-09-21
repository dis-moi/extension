/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const React = require('react');

exports.onRenderBody = ({
  pathname,
  setPreBodyComponents,
  setPostBodyComponents
}) => {
  const guidesPages =
    pathname === '/en/guides/' ||
    pathname === '/fr/eclaireurs/' ||
    process.env.NODE_ENV !== 'production';
  const homePage =
    pathname === '/' ||
    pathname === '/en/' ||
    process.env.NODE_ENV !== 'production';

  guidesPages && setPreBodyComponents([<div key={1} id={'root'} />]);

  guidesPages &&
    setPostBodyComponents([
      <script
        key={3}
        src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"
        type="text/javascript"
      />,
      <script
        key={4}
        src="https://cdn.jsdelivr.net/npm/bowser@2.4.0/bundled.js"
        type="text/javascript"
      />,
      <script
        key={5}
        src="https://cdn.jsdelivr.net/npm/jspolyfill-array.prototype.find@0.1.3/find.min.js"
        type="text/javascript"
      />,
      <script
        key={6}
        src="/script/bulle-extension.js"
        type="text/javascript"
      />,
      <script
        key={7}
        src="/script/profiles/js/profiles.bundle.js"
        type="text/javascript"
      />
    ]);
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
