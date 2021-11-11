import { Helmet } from 'react-helmet';
import React from 'react';

const InjectProfiles = () => {
  return (
    <>
      <Helmet>
        <script src="/script/profiles.bundle.js" type="text/javascript" />
        <script
          src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"
          type="text/javascript"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bowser@2.4.0/bundled.js"
          type="text/javascript"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/jspolyfill-array.prototype.find@0.1.3/find.min.js"
          type="text/javascript"
        />
        <script src="/script/bulle-extension.js" type="text/javascript" />
      </Helmet>
      <div id={'root'} />
    </>
  );
};
export default InjectProfiles;
