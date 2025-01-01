const AddAddress = ({ toogleState }) => {
  return (
    <div
      className={`${
        toogleState
          ? "bg-white rounded p-2 transition-transform transform scale-100 opacity-100 duration-500 ease-in-out"
          : "scale-95 opacity-0 pointer-events-none duration-500 ease-in-out"
      }`}
    >
      <form className="flex  flex-col justify-between gap-3">
        {/* Address / City */}
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Enter Address"
              className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
            />
          </div>
          {/* City */}
          <div className="flex flex-col gap-1">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="address"
              required
              placeholder="Enter City"
              className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
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
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="mobileNo">Mobile No * </label>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              required
              placeholder="Enter Mobile No"
              className="border w-full border-[#16A34A] rounded-md p-2 focus:ring focus:ring-indigo-200 outline-none"
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
    </div>
  );
};

export default AddAddress;
