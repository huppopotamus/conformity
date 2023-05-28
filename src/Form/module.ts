import { Reducer, useReducer } from "react";
import { FormItemProps } from "../conform";

// Initialize
let form;
const createForm = (formName: string, initFromState?: (state: FormState) => FormState) => {
  form = formName;

  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initFromState = () => initialState
  );

  return {
    ...state,
    actions: {
      registerFields: (fields) => dispatch({ type: fieldsRegistered, payload: fields }),
    }
  };
};

interface Lookup<T> { [index: string]: T } // TODO: make more global
type FormState = {
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  fields: Lookup<FormItemProps>;
};

const initialState: FormState = {
  valid: true,
  dirty: false,
  touched: false,
  fields: {},
};

// Actions
let actionRoot = `form/${form}`;
const makeAction = (action: string) => `${actionRoot}/${action}`;
const fieldsRegistered = makeAction("fields_registered");

export const reducer: Reducer<FormState, { type: string; payload: any }> = (
  state,
  { type, payload }) => {
  switch (type) {
    case fieldsRegistered:
      return {
        ...state,
        fields: {
          ...state,
          [payload.fieldName]: {}, // TODO
        }
      };
    default:
      throw new Error(`No such action [${type}] exists on reducer ${actionRoot}`);
  }
};

export default createForm;
