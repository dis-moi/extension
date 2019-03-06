import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import Help from ".";

storiesOf("screens/Help", module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add("normal", () => <Help />);
