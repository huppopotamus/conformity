// Initialize
import { FormItemProps } from "../conform";

let form;
const initReducer = (formName: string, initFromState) => {
  form = formName;
  return { initialState, reducer, initFromState };
};

interface Lookup<T> { [index: string]: T } // TODO: make more global
type FormState = {
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  fields: Lookup<FormItemProps>;
};
const initialState: FormState = {

};

// Actions
let actionRoot = `form/${form}`;
const makeAction = (action: string) => `${actionRoot}/${action}`;
const fieldsRegistered = makeAction("fields_registered");

const reducer = (state, { type, payload }) => {
  switch (type) {
    case fieldsRegistered:
      break;
    default:
      throw new Error(`No such action [${type}] exists on reducer ${actionRoot}`);
  }
};
