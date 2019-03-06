import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import Type from "./Type";

storiesOf("molecules/Type", module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add("approval", () => <Type type="Approval" />)
  .add("disapproval", () => <Type type="Disapproval" />)
  .add("alternative", () => <Type type="Alternative" />)
  .add("tip", () => <Type type="Tip" />)
  .add("other", () => <Type type="Other" />)
  .add("undefined / unknown ", () => <Type />);
