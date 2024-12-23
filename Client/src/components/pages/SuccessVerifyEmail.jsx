import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuccessVerifyEmail = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);

  const handleNavigate = () => {
    if (!user._id) {
      return navigate("/login");
    }
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 text-center lg:max-w-lg xs:max-w-xs">
        <img
          src="https://via.placeholder.com/150/4caf50/ffffff?text=Success"
          alt="Success"
          className="mx-auto mb-4 w-24 h-24"
        />
        <h2 className="text-2xl font-semibold text-green-600">
          Email Verified Successfully!
        </h2>
        <p className="text-gray-600 mt-2">
          Your email has been successfully verified. You can now access all
          features of our platform.
        </p>
        <button
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          onClick={handleNavigate}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SuccessVerifyEmail;
