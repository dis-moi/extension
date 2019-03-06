import React from "react";
import { MemoryRouter as Router } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Notice from "./Notice";

const message = '<p>Description with a <a href="http://some.url">link</a></p>';

storiesOf("organisms/Notice", module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add("Approval", () => (
    <Notice
      type="Approval"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ))
  .add("Disapproval", () => (
    <Notice
      type="Disapproval"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ))
  .add("Tip", () => (
    <Notice
      type="Tip"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ))
  .add("Other", () => (
    <Notice
      type="Other"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ))
  .add("No type", () => (
    <Notice
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ))
  .add("Undefined type", () => (
    <Notice
      type={undefined}
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ))
  .add("dismissed", () => (
    <Notice
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed
      disliked={false}
    />
  ))
  .add("with long title", () => (
    <Notice
      contributor="Jalil"
      id={123}
      message='<p>This is very long title for a notification with a <a href="http://some.url">link</a> that you may want to read some time in the future</p>'
      dismiss={action("dismiss")}
      undismiss={action("undismiss")}
      dismissed={false}
      disliked={false}
    />
  ));
