import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "../src/AppLayout/AppLayout.jsx";
import Home from "./components/Home.jsx";
import Searchpage from "./components/pages/Searchpage.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import ForgotPassword from "./components/pages/ForgotPassword.jsx";
import VerifyOtp from "./components/pages/VerifyOtp.jsx";
import Resetpassword from "./components/pages/Resetpassword.jsx";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { getUserLoginDetails } from "./Api/Query/userQuery.js";
import { setUserDetials } from "./store/userSlice.js";
import { useEffect } from "react";
import MobileMenu from "./components/MobileMenu.jsx";
import Dashboard from "./DashboardLayout/Dashboard.jsx";
import Profile from "./DashboardLayout/Profile.jsx";
import MyOrder from "./components/pages/MyOrder.jsx";
import SaveOrder from "./components/pages/SaveOrder.jsx";
import Category from "./components/pages/Category.jsx";
import SubCategory from "./components/pages/SubCategory.jsx.jsx";
import EditCategory from "./components/pages/EditCategory.jsx";
import UpdateSubcategories from "./components/pages/UpdateSubcategories.jsx";
import Products from "./components/pages/Products.jsx";
import DisplayAdminProduct from "./components/pages/DisplayAdminProduct.jsx";
import useHook from "./hooks/useHook.jsx";
import ListProduct from "./components/pages/ListProduct.jsx";
import MainProductPage from "./components/pages/MainProductPage.jsx";
import SuccessVerifyEmail from "./components/pages/SuccessVerifyEmail.jsx";
import CartPage from "./components/pages/CartPage.jsx";
import CheckoutPage from "./components/pages/CheckoutPage.jsx";

function App() {
  const dispatch = useDispatch();
  const { fetchCategory, fetchSubCategories, fetchCartItems } = useHook();

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

  useEffect(() => {
    fetchUserData();
    fetchCategory();
    fetchSubCategories();
    fetchCartItems();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: (
            <>
              <Home />
            </>
          ),
        },
        {
          path: "/search",
          element: <Searchpage />,
        },
        {
          path: "/register-user",
          element: <Register />,
        },
        {
          path: `/verify-email`,
          element: <SuccessVerifyEmail />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/verify-opt",
          element: <VerifyOtp />,
        },
        {
          path: "/reset-password/:id",
          element: <Resetpassword />,
        },
        {
          path: "/menubar",
          element: <MobileMenu />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
              path: "profile/:id",
              element: <Profile />,
            },
            {
              path: "your-order",
              element: <MyOrder />,
            },
            {
              path: "save-order",
              element: <SaveOrder />,
            },
            {
              path: "admin-product",
              element: <DisplayAdminProduct />,
            },
            {
              path: "upload-product",
              element: <Products />,
            },
            {
              path: "product-category",
              element: <Category />,
            },
            {
              path: "product-Subcategory",
              element: <SubCategory />,
            },
            {
              path: "edit-category/:id",
              element: <EditCategory />,
            },
            {
              path: "updata-subcategory/:id",
              element: <UpdateSubcategories />,
            },
          ],
        },

        {
          path: ":category",
          children: [
            {
              path: ":subCategory",
              element: <ListProduct />,
            },
          ],
        },
        {
          path: "/product-page/:id",
          element: <MainProductPage />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
