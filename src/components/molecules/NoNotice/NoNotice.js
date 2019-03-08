import React, { Fragment } from "react";
import IllustrationContainer from "./IllustrationContainer";
import Illustration from "./Illustration";
import Title from "./Title";

export default () => (
  <Fragment>
    <IllustrationContainer>
      <Illustration />
    </IllustrationContainer>

    <Title>Il n’y a plus de recommandation ici</Title>
  </Fragment>
);
