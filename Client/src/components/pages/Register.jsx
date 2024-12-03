import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // handle onChange
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // handle Form Submit / User Registration
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    // Reset userData to initial values
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-lg mx-auto rounded p-4">
        <h2 className="text-[1.6rem]">Welcome to ShopHub</h2>

        <form
          action=""
          className="flex gap-2 flex-col mt-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name *</label>
          <input
            className="outline-0 bg-blue-50  border rounded px-2 py-1"
            type="text"
            name="name"
            id="name"
            required
            placeholder="Enter Your Name"
            autoFocus
            value={userData.name}
            onChange={handleOnChange}
          />
          <label htmlFor="email">Email *</label>
          <input
            className="outline-0 bg-blue-50  border rounded px-2 py-1"
            type="text"
            name="email"
            id="email"
            required
            placeholder="Enter Your Email"
            value={userData.email}
            onChange={handleOnChange}
          />
          <label htmlFor="password">Password *</label>
          <div className="outline-0 bg-blue-50 rounded border flex items-center focus:focus-within:border-red-500 ">
            <input
              className="w-full outline-0 bg-blue-50 px-2 py-1"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
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
            type="submit"
            className="mt-3 border py-1 bg-green-800 hover:bg-green-700 rounded text-white font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
