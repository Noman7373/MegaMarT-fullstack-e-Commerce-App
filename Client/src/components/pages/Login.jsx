import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userLogIn } from "../../Api/Query/userQuery";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetials } from "../../store/userSlice";
import { FETCH_STATUS } from "../status/fetchStatus";
import Loader from "../status/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);

  const [responseData, setResponseData] = useState({});

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // validate form values
  const validFormValues = Object.values(userData).every((value) => value);

  const isIDLE = status === FETCH_STATUS.IDLE;
  const isLoading = status === FETCH_STATUS.LOADING;
  const isSuccess = status === FETCH_STATUS.SUCCESS;
  const isError = status === FETCH_STATUS.ERROR;

  // pause the re-rendering
  useEffect(() => {
    if (status === FETCH_STATUS.SUCCESS) {
      dispatch(setUserDetials(responseData?.data?.userData));
      const { accessToken, refreshToken } = responseData?.data?.tokens;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
      setUserData({ email: "", password: "" });
    }
  }, [status, dispatch]);

  // useEffect for showing success and error messege
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // handle on change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // handle Register form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(FETCH_STATUS.LOADING);
    try {
      const response = await userLogIn({
        email: userData.email,
        password: userData.password,
      });
      if (response.data.error) {
        setStatus(FETCH_STATUS.ERROR);
        setErrorMessage(response.data.message);
      } else if (response.data.success) {
        setResponseData(response);
        setStatus(FETCH_STATUS.SUCCESS);
      }
    } catch (error) {
      setStatus(FETCH_STATUS.ERROR);
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-sm mx-auto rounded py-2 px-4">
        <p className="text-xl font-semibold">Log In To Access</p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <div>
          <form
            className="flex gap-3 flex-col mt-4 py-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email *</label>
            <input
              className=" bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              type="text"
              name="email"
              id="email"
              required
              autoFocus
              autoComplete="email"
              placeholder="Enter Your Email"
              value={userData.email}
              onChange={handleOnChange}
            />
            <label htmlFor="password">Password *</label>
            <div className="outline-0 bg-blue-50 rounded border flex items-center focus-within:border-yellow-300">
              <input
                className="w-full outline-none bg-blue-50 px-2 py-1 focus:border-yellow-300"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                required
                autoComplete="false"
                placeholder="Enter Your Password"
                value={userData.password}
                onChange={handleOnChange}
              />

              <span
                className="cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
              </span>
            </div>
            <p className="flex items-end justify-end">
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </p>
            <button
              disabled={!validFormValues}
              type="submit"
              className={`${
                validFormValues
                  ? "bg-orange-600 text-center"
                  : "bg-orange-400  text-center cursor-not-allowed"
              } "mt-4 border py-2 bg-orange-800 text-center"  ${
                validFormValues ? " hover:bg-orange-700  text-center" : ""
              } rounded text-white font-bold  text-center"`}
            >
              {isIDLE && "Log In"}
              {isLoading && <Loader />}
              {isError && "Log In"}
            </button>
          </form>
        </div>
        <div className="flex justify-between">
          <p>
            Dont have accout?{" "}
            <Link
              className="text-green-800 font-semibold hover:text-green-600"
              to={"/register-user"}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
