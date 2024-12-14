import React, { useContext } from "react";
import { ContextProvider } from "./useContext";

const useHook = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useHook must be used within a Provider");
  }

  const { fetchCategory, category, setCategory,loading } = context;

  return { fetchCategory, category, setCategory,loading };
};

export default useHook;
