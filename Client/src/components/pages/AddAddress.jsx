import { useState } from "react";
import { createUserAddress } from "../../Api/Query/userQuery";
import { useSelector } from "react-redux";
import CustomNotification from "../../utils/CustomNotification";
import useHook from "../../hooks/useHook";

const AddAddress = ({ toogleState }) => {
  const user = useSelector((state) => state?.user);
  const { fetchAddressDetails } = useHook();
  const userId = user?._id;

  const [userAddress, setUserAddress] = useState({
    address_line: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    mobile: "",
  });

  // for notification
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  //  OnChange handler
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset Form
  const resetForm = () => {
    setUserAddress({
      address_line: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      mobile: "",
    });
  };

  //  submit handler
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserAddress({
        userId,
        address_line: userAddress.address_line,
        city: userAddress.city,
        state: userAddress.city,
        country: userAddress.country,
        pincode: userAddress.pincode,
        mobile: userAddress.mobile,
      });

      if (response.data.success) {
        fetchAddressDetails(userId);
        resetForm();
        toogleState(false);
        setIsVisible(true);
        setNotification({
          message: `Added Address details!`,
          type: "success",
        });
      }
    } catch (error) {
      setIsVisible(true);
      setNotification({
        message: `First Log In To Proceed The Payment! || ${error.message}`,
        type: "error",
      });
    }
  };

  return (
    <>
      <div
        className={`${
          toogleState
            ? "bg-white rounded p-2 transition-transform transform scale-100 opacity-100 duration-500 ease-in-out"
            : "scale-95 opacity-0 pointer-events-none duration-500 ease-in-out"
        }`}
      >
        <form
          className="flex  flex-col justify-between gap-3"
          onSubmit={handleOnSubmit}
        >
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
      </div>

      {/* Notification */}
      <CustomNotification
        Notification={{
          message: notification.message,
          type: notification.type,
          isVisible,
          setIsVisible,
        }}
      />
    </>
  );
};

export default AddAddress;
