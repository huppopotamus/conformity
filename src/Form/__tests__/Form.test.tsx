import React, { FC } from "react";
import { render } from "@testing-library/react";

import Form from "..";
import { FormItemProps } from "../../conform";

const TestComponent: FC<FormItemProps> = () => <></>;

describe("Form tests", () => {
  it("should do something", () => {
    const form = render(
      <Form name="test-form">
        <TestComponent />
      </Form>
    );

    expect(form).not.toBeNull();
  });
});
