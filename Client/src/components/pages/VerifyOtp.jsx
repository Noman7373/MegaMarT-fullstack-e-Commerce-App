import { useState } from "react";

const VerifyOtp = () => {
  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-2 w-full max-w-lg mx-auto rounded py-2 px-4">
        <h2 className="text-[1.3rem]">Please Enter a 6-digits code</h2>
        <p className="text-gray-500">We sent you 6-digit code to you at {}</p>
        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>} */}
        {/* 
        <div>
          <form
            className="flex gap-3 flex-col mt-4 py-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email *</label>
            <input
              className="bg-blue-50 border rounded px-2 py-1 outline-none focus:border-yellow-300"
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleOnChange}
            />

            <p className="flex items-end justify-end">
              <Link to={"/login"}>Log In?</Link>
            </p>
            <button
              disabled={!validFormValues}
              type="submit"
              className={`mt-4 border py-2 rounded text-white font-bold ${
                validFormValues
                  ? "bg-green-800 hover:bg-green-700"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              Verify Email
            </button>
          </form>
        </div> */}
      </div>
    </section>
  );
};

export default VerifyOtp;
