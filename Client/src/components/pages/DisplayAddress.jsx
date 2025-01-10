import { useState } from "react";
import { useSelector } from "react-redux";

const DisplayAddress = () => {
  const addressList = useSelector((state) => state.address.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  //   console.log(addressList[selectAddress]);

  return (
    <>
      {addressList.map((addressData, index) => {
        return (
          <label key={addressData._id} htmlFor={index + "address"}>
            <div className="w-full mx-auto  p-4 bg-gray-100 border rounded-lg shadow-md">
              <div className="flex justify-between">
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  Address Details
                </h2>
                <div className="flex items-center space-x-2">
                  <label
                    htmlFor="address1"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Address
                  </label>
                  <input
                    type="radio"
                    name="address1"
                    id={index + "address"}
                    value={index}
                    onChange={(e) => setSelectAddress(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Address_Line:</span>{" "}
                  {addressData.address_line}
                </p>
                <p>
                  <span className="font-medium">City:</span> {addressData.city}
                </p>
                <p>
                  <span className="font-medium">State:</span>{" "}
                  {addressData.state}
                </p>
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {addressData.country}
                </p>
                <p>
                  <span className="font-medium">PinCode:</span>{" "}
                  {addressData.pincode}
                </p>
                <p>
                  <span className="font-medium">Mobile No:</span>{" "}
                  {addressData.mobile}
                </p>
              </div>
            </div>
          </label>
        );
      })}
    </>
  );
};

export default DisplayAddress;
