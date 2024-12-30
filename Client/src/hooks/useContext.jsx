import { createContext, useState } from "react";
import {
  getCartItemsAxios,
  getCategoryAxios,
  getSubCategoryAxios,
  updateCartItemsQuantityAxios,
} from "../Api/Query/userQuery";
import { useDispatch } from "react-redux";
import { addProductCategory, addSubcategory } from "../store/productSlice";
import { handleAddToCart } from "../store/cart";
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
  const [quantity, setQuantity] = useState(0);

  // fetch Category
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

  // fetch Subcategory
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
      throw new Error("An error occured try again", error.message);
    }
  };

  // fetch CartItems
  const fetchCartItems = async () => {
    setIsloading(true);
    try {
      const response = await getCartItemsAxios();

      if (response.data.success) {
        const { cartItems } = response.data;
        setIsloading(false);
        dispatch(handleAddToCart({ cartItems, isLoading }));
      }
    } catch (error) {
      throw new Error("An error occured try again", error.message);
    }
  };

  // Update CartItems-Quantity
  const updateCartItemQuantity = async (_id, quantity) => {
    setIsloading(true);
    try {
      const response = await updateCartItemsQuantityAxios({
        _id,
        quantity,
      });

      setIsloading(false);
      if (response.data.success) {
        fetchCartItems();
      }
    } catch (error) {
      throw new Error("An error occured try again", error.message);
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
        fetchCartItems,
        updateCartItemQuantity,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
