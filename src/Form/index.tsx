import React, { createContext, FC, useContext, useMemo } from "react";
import createForm from "./module";

const Context = createContext({});
export const useConform = () => useContext(Context);

interface FormProps {
  name: string;
  children: React.ReactNode | React.ReactNode[]
}

// Context Provider
const Form: FC<FormProps> = ({ name, children, ...rest }) => {
  const { state, actions} = createForm(name);

  const value = useMemo(() => ({
    ...state,
    ...actions,
    submit: () => handleFormSubmit
  }), [state, actions]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("submit");
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
