import { createContext, useState } from "react";
import { getCategoryAxios } from "../Api/Query/userQuery";

// Create Context
export const ContextProvider = createContext();

// Provider Component
export const ProviderContext = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCategory = async () => {
    setLoading(loading);
    try {
      const response = await getCategoryAxios();

      if (response.data.success) {
        setLoading(false);
        const { categoryProduct } = response.data;

        setCategory(categoryProduct);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContextProvider.Provider value={{ fetchCategory, category, setCategory ,loading }}>
      {children}
    </ContextProvider.Provider>
  );
};
