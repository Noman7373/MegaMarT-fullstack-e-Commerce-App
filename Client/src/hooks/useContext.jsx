import { createContext, useEffect, useState } from "react";
import {
  deleteCategoryAxios,
  fetchOrderHistoryAxios,
  getCartItemsAxios,
  getCategoryAxios,
  getSubCategoryAxios,
  getUserAddress,
  getUserLoginDetails,
  removeCartItemsAxios,
  updateCartItemsQuantityAxios,
} from "../Api/Query/userQuery";
import { useDispatch } from "react-redux";
import { addProductCategory, addSubcategory } from "../store/productSlice";
import { handleAddToCart } from "../store/cart";
import { addUserAddressDetails } from "../store/address";
import { setUserDetials } from "../store/userSlice";
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
  const [cartLoading, setCartLoading] = useState(false);

  const [selectAddress, setSelectAddress] = useState(0);

  // for scrollBar
  const [isScrollDisabled, setIsScrollDisabled] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  
  // OrderHistory
  const [orderHistory, setOrderHistory] = useState([]);


  // scrollBar
  useEffect(() => {
    if (isScrollDisabled) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isScrollDisabled]);

  const disableScroll = () => setIsScrollDisabled(true);
  const enableScroll = () => setIsScrollDisabled(false);

  // Fetch User Details
  const fetchUserData = async () => {
    try {
      const response = await getUserLoginDetails();
      if (response.data.success) {
        dispatch(setUserDetials(response?.data?.userData));
      }
    } catch (error) {
      throw new Error("Data fetching Error", error);
    }
  };

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
    // setCartLoading(true);
    try {
      const response = await getCartItemsAxios();

      if (response.data.success) {
        const { cartItems } = response.data;
        // setCartLoading(false);
        dispatch(handleAddToCart({ cartItems, cartLoading }));
      }
    } catch (error) {
      throw new Error("An error occured try again", error.message);
    } finally {
      // setCartLoading(false);
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

  // Remove CartItem
  const removeCartItems = async (_id) => {
    try {
      const response = await removeCartItemsAxios({ _id });

      if (response.data.success) {
        fetchCartItems();
      }
    } catch (error) {
      throw new Error("An error occured", error.message);
    }
  };

  // get-Address-Details Method
  const fetchAddressDetails = async (_id) => {
    setIsloading(true);
    try {
      const response = await getUserAddress(_id);
      setIsloading(false);
      if (response.success) {
        const { userAddressDetails } = response;
        dispatch(addUserAddressDetails(userAddressDetails));
      }
    } catch (error) {
      throw new Error("An error occured try again", error.message);
    }
  };

  // Fetch order History
  const fetchOrderHistory = async () => {
    setIsloading(true);
    try {
      const response = await fetchOrderHistoryAxios();
      setIsloading(false);
      if (response.data.success) {
        const { fetchOrderHistory } = response.data;
        setOrderHistory(fetchOrderHistory);
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
        setSearch,
        fetchUserData,
        fetchCartItems,
        updateCartItemQuantity,
        removeCartItems,
        totalPrice,
        setTotalPrice,
        totalQty,
        setTotalQty,
        disableScroll,
        enableScroll,
        fetchAddressDetails,
        selectAddress,
        setSelectAddress,
        fetchOrderHistory,
        orderHistory,
        setOrderHistory,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};
