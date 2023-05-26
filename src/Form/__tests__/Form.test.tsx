import React from "react";
import { render } from "@testing-library/react";

import { Form } from "..";

describe("Form tests", () => {
  it("should do something", () => {
    const form = render(
      <Form name="test-form">
        <input type="text" onChange={() => {}} />
      </Form>
    );
  });
});
