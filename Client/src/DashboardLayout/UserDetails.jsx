import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../Api/Query/userQuery";
import { setUserDetials } from "../store/userSlice";

const UserDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { _id, name, email, mobile } = user;

  const [userDetails, setUserDetails] = useState({
    name: name || "",
    email: email || "",
    mobile: mobile || "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserDetails({
      name: name || "",
      email: email || "",
      mobile: mobile || "00000000",
    });
  }, [name, email, mobile]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await updateUserDetails({
        _id,
        name: userDetails.name,
        email: userDetails.email,
        mobile: userDetails.mobile,
      });

      if (response?.data?.success) {
        const { name, email, mobile } = response.data.data;
        dispatch(setUserDetials({ name, email, mobile }));
      } else {
        setError(response?.data?.message || "Failed to update user details.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-3 sm:grid-cols-1 xs:grid col-1 lg:max-w-[60%]">
          {["name", "email", "mobile"].map((field) => (
            <div
              key={field}
              className="flex flex-col border-[1px] border-dotted border-gray-400 rounded-md p-1 h-20"
            >
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="bg-[#F2F2F2] outline-0 p-2 rounded-md"
                type="text"
                id={field}
                name={field}
                autoFocus={field === "name"}
                value={userDetails[field]}
                onChange={handleOnChange}
              />
            </div>
          ))}
          <button
            className={`bg-[#FB8114] text-white lg:mt-auto lg:ml-auto p-3 rounded ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#f19646]  hover:text-white"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Edit Profile"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

export default UserDetails;
