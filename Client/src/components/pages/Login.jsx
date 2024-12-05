import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { userLogIn } from "../../Api/Query/userQuery";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // validate form values
  const validFormValues = Object.values(userData).every((value) => value);

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
    try {
      const response = await userLogIn({
        email: userData.email,
        password: userData.password,
      });
      console.log(response.data);

      if (response.data.error) {
        setErrorMessage(response.data.message);
      } else if (response.data.success) {
        setSuccessMessage(response.data.message);
        navigate("/");
        setUserData({ email: "", password: "" });
      }
    } catch (error) {
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-lg mx-auto rounded py-2 px-4">
        <p>Log In To Access</p>
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
                validFormValues ? "bg-green-800" : "bg-gray-600"
              } "mt-4 border py-2 bg-green-800 ${
                validFormValues ? " hover:bg-green-700" : ""
              } rounded text-white font-bold"`}
            >
              Log In
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
