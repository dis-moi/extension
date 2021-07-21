import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/Layout';
import Seo from '../components/seo';
import { Title1 } from '../../../../components/atoms/Title1';

const IndexPage = () => {
  const toto = (param: string) => param;
  const tit: string = 'tit';
  return (
    <Layout>
      <Seo title="Home" />
      {toto(2)}
      <h1>Hi people</h1>
      <Title1>Coucou</Title1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <StaticImage
        src="../images/gatsby-astronaut.png"
        width={300}
        quality={95}
        formats={['AUTO', 'WEBP', 'AVIF']}
        alt="A Gatsby astronaut"
        style={{ marginBottom: `1.45rem` }}
      />
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
        <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
