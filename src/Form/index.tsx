import React, { createContext, FC, useContext, useMemo, useReducer } from "react";
import { FormItemProps } from "../conform";

const Context = createContext({});
export const useConform = () => useContext(Context);

interface FormProps {
  name: string;
  // children: FC<FormItemProps>[] | FC<FormItemProps>
}

// Context Provider
const Form: FC<FormProps> = ({ name, children, ...rest }) => {
  const { reducer, initialState, initFromProps } = initReducer(name, rest);
  const [state, dispatch] = useReducer(reducer, initialState, initFromProps);

  const value = useMemo(() => ({
    submit: () => handleFormSubmit
  }), []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onSubmit?.();
  }

  return (
    <Context.Provider value={value}>
      <form name={name} onSubmit={handleFormSubmit}>
        {children}
      </form>
    </Context.Provider>
  );
};

export default Form;
