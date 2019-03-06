import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import Filters from "./Filters";

storiesOf("screens/Filters", module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add("normal", () => <Filters />);
