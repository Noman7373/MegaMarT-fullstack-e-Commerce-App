import React from "react";

const DisplayAddress = ({ addressData }) => {
  return (
    <>
      <div className="w-full mx-auto  p-4 bg-gray-100 border rounded-lg shadow-md">
        <h2 className="text-lg font-bold text-gray-700 mb-2">
          Address Details
        </h2>
        <div className="text-sm text-gray-600">
          <p>
            <span className="font-medium">Address_Line:</span>{" "}
            {addressData.address_line}
          </p>
          <p>
            <span className="font-medium">City:</span> {addressData.city}
          </p>
          <p>
            <span className="font-medium">Country:</span> {addressData.country}
          </p>
          <p>
            <span className="font-medium">PinCode:</span> {addressData.pincode}
          </p>
          <p>
            <span className="font-medium">Mobile No:</span> {addressData.mobile}
          </p>
        </div>
      </div>
    </>
  );
};

export default DisplayAddress;
