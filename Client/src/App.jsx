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
import { getUserLoginDetails } from "./Api/Query/userQuery.js";
import { setUserDetials } from "./store/userSlice.js";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
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
      ],
    },
  ]);

  const fetchUserData = async () => {
    try {
      const user = await getUserLoginDetails();
      dispatch(setUserDetials(user?.data?.userData));
      // console.log("user data", user?.data?.userData);
    } catch (error) {
      console.log("Data fetching error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
