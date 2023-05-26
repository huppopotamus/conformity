import React, { createContext, FC, useContext, useMemo } from "react";

const Context = createContext({});
export const useConform = () => useContext(Context);

interface FormProps {
  name: string;
  children: FC<FormItemProps>[] | FC<FormItemProps>
}

// Context Provider
const Form: FC<FormProps> = ({ name, children }) => {
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
