import React from "react";

interface FormItemProps {
  name?: string;
}

// Conform HOC

/**
 * Conform a wrapped component or native element to the form and applies standard form props when a form is present.
 *
 * @WrappedComponent Conforming component. Attaches to the nearest Conformity form unless otherwise specified.
 * @form Form name. Will seek the name of the nearest conformity form when not provided.
 * @nonconformist Optional. Will cause the WrappedComponent to ignore any forms and act as an independent field.
 */
export const conform = (WrappedComponent, name) => ({ name }: FormItemProps) => {

  return <WrappedComponent form={name} {...props} />;
};
