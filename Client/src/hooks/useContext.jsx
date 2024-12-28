import { createContext, useState } from "react";
import { getCategoryAxios, getSubCategoryAxios } from "../Api/Query/userQuery";
import { useDispatch } from "react-redux";
import { addProductCategory, addSubcategory } from "../store/productSlice";
// Create Context
export const ContextProvider = createContext();

// Provider Component
export const ProviderContext = ({ children }) => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [email, setEmail] = useState("");
  // for SearchPage
  const [search, setSearch] = useState("");

  const fetchCategory = async () => {
    setLoading(loading);
    try {
      const response = await getCategoryAxios();

      if (response.data.success) {
        setLoading(false);
        const { categoryProduct } = response.data;

        setCategory(categoryProduct);
        dispatch(addProductCategory(categoryProduct));
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubCategories = async () => {
    setIsloading(true);
    const response = await getSubCategoryAxios();
    setIsloading(false);
    if (response.data.success) {
      const { savedSubCategory } = response?.data;
      setSubcategories(savedSubCategory);
      dispatch(addSubcategory(savedSubCategory));
    }
    try {
    } catch (error) {
      throw new Error("An error occured try again", error);
    }
  };

  return (
    <ContextProvider.Provider
      value={{
        fetchCategory,
        category,
        setCategory,
        loading,
        isLoading,
        subcategories,
        setSubcategories,
        fetchSubCategories,
        email,
        setEmail,
        search,
        setSearch,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
