import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { registerUser } from "../../Api/Query/userQuery.js";
import { FETCH_STATUS } from "../status/fetchStatus.js";
import Loader from "../status/Loader.jsx";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import facebookLogoImage from "../../assets/facevook.webp";

// import bgImage from "../../assets/bg-sign.jpeg";

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
    <section className="container mx-auto px-2 flex justify-between">
      <div className="bg-white my-2 w-full max-w-sm mx-auto rounded py-6 px-4">
        <p className="text-xl font-semibold">Welcome to MegaMarT</p>
        <p className="text-red-500">{error}</p>
        <div>
          <form
            className="flex gap-3 flex-col mt-2 py-2"
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

            <p className="text-center">
              Already Hava Account?{" "}
              <Link
                to={"/login"}
                className="text-blue-700 font-semibold hover:text-green-600"
              >
                SIGN IN NOW
              </Link>
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
              {isIDLE && "SIGN UP"}
              {isLoading && <Loader />}
              {isError && "SIGN UP"}
            </button>
          </form>
        </div>
        <p className="flex items-center justify-center text-gray-400">
          ------------- or --------------
        </p>

        <div className="flex gap-2">
          <div className="flex bg-blue-900 rounded p-2 items-center gap-2 cursor-pointer hover:bg-blue-700">
            <span>
              {" "}
              <FaFacebook className="text-white" size={20} />
            </span>
            <p className="text-white text-[0.8rem] flex-2 w-full text-center">
              LOGIN WITH FACEBOOK
            </p>
          </div>
          <div className="flex bg-red-500 rounded p-2 items-center gap-2 cursor-pointer hover:bg-red-700">
            <span>
              {" "}
              <FaGoogle className="text-white" size={20} />
            </span>
            <p className="text-white flex-2 w-full text-center text-[0.8rem]">
              LOGIN WITH GOOGLE
            </p>
          </div>
        </div>
      </div>
      {/* <div>
        <img src={bgImage} alt="bg-image" />
      </div> */}
    </section>
  );
};

export default Register;
