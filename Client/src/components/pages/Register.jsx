import React, { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { registerUser } from "../../Api/Query/userQuery.js";
import { FETCH_STATUS } from "../status/fetchStatus.js";
import Loader from "../status/Loader.jsx";
const Register = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // handle form validation
  const validFormValues = Object.values(userData).every((value) => value);

  useEffect(() => {
    if (error) {
      const Timer = setInterval(() => setError(""), 3000);
      return () => clearInterval(Timer);
    }
  }, [error]);

  // handle onChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // handle Form Submit / User Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(FETCH_STATUS.LOADING);
    try {
      const response = await registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      if (response.data.error) {
        setError(response.data.message);
        setStatus(FETCH_STATUS.ERROR);
      }

      if (response.data.success) {
        setStatus(FETCH_STATUS.SUCCESS);
      }
    } catch (error) {
      setError("An error occurred while Register. Please try again.");
    }
  };

  const isIDLE = status === FETCH_STATUS.IDLE;
  const isLoading = status === FETCH_STATUS.LOADING;
  const isSuccess = status === FETCH_STATUS.SUCCESS;
  const isError = status === FETCH_STATUS.ERROR;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      setUserData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [status, navigate]);

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-lg mx-auto rounded py-2 px-4">
        <p>Welcome to ShopHub</p>
        <p className="text-red-500">{error}</p>
        <div>
          <form
            className="flex gap-3 flex-col mt-4 py-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Name *</label>
            <input
              className=" bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter Your Name"
              autoComplete="name"
              autoFocus
              value={userData.name}
              onChange={handleOnChange}
            />
            <label htmlFor="email">Email *</label>
            <input
              className=" bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              type="text"
              name="email"
              id="email"
              required
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

            <button
              disabled={!validFormValues}
              type="submit"
              className={`${
                validFormValues ? "bg-green-800" : "bg-gray-600"
              } "mt-4 border py-2 bg-green-800 ${
                validFormValues ? " hover:bg-green-700" : ""
              } rounded text-white font-bold"`}
            >
              {isIDLE && "Register"}
              {isLoading && <Loader />}
              {isError && "Register"}
            </button>
          </form>
        </div>

        <p>
          Already Hava Account?{" "}
          <Link
            to={"/login"}
            className="text-green-800 font-semibold hover:text-green-600"
          >
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
