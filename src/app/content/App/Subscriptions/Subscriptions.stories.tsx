import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import Subscriptions from ".";

storiesOf("screens/Subscriptions", module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add("normal", () => <Subscriptions />);
