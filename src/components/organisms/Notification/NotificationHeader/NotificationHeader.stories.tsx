import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import NotificationHeader from ".";

storiesOf("molecules/NotificationHeader", module)
  .add("normal", () => (
    <Router>
      <NotificationHeader close={action("close")} />
    </Router>
  ))
  .add("with title", () => (
    <Router>
      <NotificationHeader title="title" close={action("close")} />
    </Router>
  ))
  .add("with long title", () => (
    <Router>
      <NotificationHeader
        title="Very long notification title, it should breaktitle"
        close={action("close")}
      />
    </Router>
  ))
  .add("with nav history", () => (
    <Router initialIndex={2} initialEntries={["/path", "/pass"]}>
      <NotificationHeader title="title" close={action("close")} />
    </Router>
  ));
