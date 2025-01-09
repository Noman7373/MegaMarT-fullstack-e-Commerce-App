import React, { useState } from "react";

const UpdateAddress = ({ closePage }) => {
  const [userAddress, setUserAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
  });
  const handleOnChange = () => {};
  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="fixed top-0 bottom-0 left-0 right-0 p-4 flex justify-center z-40 items-center bg-neutral-800 bg-opacity-40">
        <form
          className="flex  flex-col justify-between gap-3 bg-white p-10 rounded "
          onSubmit={handleOnSubmit}
        >
          <div className="flex justify-between">
            <h3 className="font-semibold">Edit Your Address</h3>
            <button
              onClick={closePage}
              className="text-black hover:text-gray-400 text-right"
              aria-label="Close Modal"
            >
              ✕
            </button>
          </div>
          <hr />
          {/* Address / City */}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="address_line">Address *</label>
              <input
                type="text"
                id="address_line"
                name="address_line"
                required
                placeholder="Enter Address"
                className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
                value={userAddress.address_line}
                onChange={handleOnChange}
              />
            </div>
            {/* City */}
            <div className="flex flex-col gap-1">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                required
                placeholder="Enter City"
                className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
                value={userAddress.city}
                onChange={handleOnChange}
              />
            </div>
          </div>

          {/* State / Pincode*/}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                required
                placeholder="Enter State"
                className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
                value={userAddress.state}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="pincode">Pincode </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                required
                placeholder="Enter Pincode"
                className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
                value={userAddress.pincode}
                onChange={handleOnChange}
              />
            </div>
          </div>

          {/* Country / Mobile No*/}
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                required
                placeholder="Enter Country"
                className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
                value={userAddress.country}
                onChange={handleOnChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="mobile">Mobile No * </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                required
                placeholder="Enter Mobile No"
                className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
                value={userAddress.mobile}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#16A34A] p-2 rounded-md mt-2 text-white"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default UpdateAddress;
