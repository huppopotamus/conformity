import React from "react";
import { createRoot } from "react-dom/client";

import Form, { conform } from "./src";

const TextInput = () => <input name="test-input" type="text" />;

const ConformedField = conform(TextInput, "test-harness");

const TestHarness = () => (
  <Form name="test-harness" onSubmit={() => console.log("submit")}>
    <ConformedField name="test-field1" />
    <ConformedField name="test-field2" />
    <ConformedField name="test-field3" />
    <button type="submit">Submit</button>
  </Form>
);

// @ts-ignore
createRoot(document.getElementById("test-harness"))
  .render(<TestHarness />);
