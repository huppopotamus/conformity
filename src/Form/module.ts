import { Reducer, useReducer } from "react";

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
    state,
    actions: {
      registerField: (field: string) => dispatch({ type: fieldsRegistered, payload: field }),
      onTouch: (field: string) => {
        console.log(`${field} touched`);
        dispatch({ type: fieldTouched, payload: field })
      },
      onChange: (field: string) => {
        console.log(`${field} changed`);
        dispatch({ type: fieldChanged, payload: field })
      },
    }
  };
};

interface EntryState {
  valid: boolean;
  dirty: boolean;
  touched: boolean;
  error: any | null;
}

interface Lookup<T> { [index: string]: T } // TODO: make more global
interface FormState extends Omit<EntryState, "error"> {
  fields: Lookup<EntryState>;
  errors: any[] | null;
}

const initialState: FormState = {
  valid: true,
  dirty: false,
  touched: false,
  errors: null,
  fields: {},
};

// Actions
let actionRoot = `form/${form}`;
const makeAction = (action: string) => `${actionRoot}/${action}`;
const fieldsRegistered = makeAction("field_registered");
const fieldTouched = makeAction("field_touched");
const fieldChanged = makeAction("field_changed");

type Action = { type: string; payload: any; };
// @ts-ignore
export const reducer: Reducer<FormState, Action> = (
  state,
  { type, payload }) => {
  switch (type) {
    case fieldsRegistered:
      return {
        ...state,
        fields: {
          ...state.fields,
          [payload]: {
            valid: true,
            touched: false,
            dirty: false,
            error: null,
          }, // TODO
        }
      };
    case fieldTouched:
      return {
        ...state,
        touched: true,
        fields: {
          ...state.fields,
          [payload]: {
            ...state.fields[payload],
            touched: true,
          },
        },
      };
    case fieldChanged:
      return {
        ...state,
        dirty: true,
        fields: {
          ...state.fields,
          [payload]: {
            ...state.fields[payload],
            dirty: true,
          },
        },
      };
    default:
      throw new Error(`No such action [${type}] exists on reducer ${actionRoot}`);
  }
};

export default createForm;
