import React from "react";
import { useConform } from "../Form";

export interface FormItemProps {
  name?: string;
  nonconformist?: boolean;
}

// Conform HOC

/**
 * Conform a wrapped component or native element to the form and applies standard form props when a form is present.
 *
 * @WrappedComponent Conforming component. Attaches to the nearest Conformity form unless otherwise specified.
 * @form Form name. Will seek the name of the nearest conformity form when not provided.
 */
export const conform = (WrappedComponent, name) => ({ formName, ...rest }: FormItemProps) => {
  const { fields } = useConform(formName);
  // TODO: detect nearest form provider

  const fieldState = fields[name];

  const ConformedComponent = React.cloneElement(WrappedComponent, {
    name,
    form,
    ...fieldState,
    ...rest,
  });

  return <ConformedComponent />;
};
