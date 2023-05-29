import React, { useEffect } from "react";
import { useConform } from "../Form";

export interface FormItemProps {
  name?: string;
  nonconformist?: boolean;
}

/**
 * Conform a wrapped component or native element to the form and applies standard form props when a form is present.
 *
 * @WrappedComponent Conforming component. Attaches to the nearest Conformity form unless otherwise specified.
 * @form Form name. Will seek the name of the nearest conformity form when not provided.
 */
export const conform = (
  WrappedComponent,
  formName?: string
) => ({ name, onChange, onFocus, children, ...rest }: FormItemProps) => {
  // TODO: detect nearest form provider
  const {
    registerField,
    onTouch,
    onFieldChanged,
  } = useConform();

  useEffect(() => {
    registerField(name);
  }, []);

  // TODO: figure out why these events aren't getting triggered
  const handleFieldTouched = () => {
    console.log(name, 'touched');
    onTouch(name);
    onFocus?.();
  };

  const handleFieldChanged = () => {
    console.log(name, 'changed');
    onFieldChanged(name);
    onChange?.();
  };

  return React.cloneElement(<WrappedComponent />, {
    name,
    onFocus: handleFieldTouched,
    onChange: handleFieldChanged,
    ...rest,
  }, children);
};
