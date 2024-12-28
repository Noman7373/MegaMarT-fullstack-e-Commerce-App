import React, { useContext } from "react";
import { ContextProvider } from "./useContext";

const useHook = () => {
  const context = useContext(ContextProvider);
  if (!context) {
    throw new Error("useHook must be used within a Provider");
  }

  const {
    fetchCategory,
    category,
    setCategory,
    loading,
    isLoading,
    subcategories,
    fetchSubCategories,
    email,
    setEmail,
    search,
    setSearch,
  } = context;

  return {
    fetchCategory,
    category,
    setCategory,
    loading,
    isLoading,
    subcategories,
    fetchSubCategories,
    email,
    setEmail,
    search,
    setSearch,
  };
};

export default useHook;
