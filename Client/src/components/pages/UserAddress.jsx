import { useSelector } from "react-redux";
import AddAddress from "./AddAddress";
import { useState } from "react";

const UserAddress = () => {
  const addressList = useSelector((state) => state.address.addressList);
  const [isOpenAddressBox, setIsOpenAddressBox] = useState(true);
  console.log(addressList);

  return (
    <section>
      <div className="flex justify-between items-center p-2 bg-white shadow-md ">
        <h1 className="font-semibold">Address</h1>
        <button
          //   onClick={() => setIsUploadCategory(true)}
          className="bg-green-600 p-2 text-white rounded hover:bg-green-700"
        >
          Add Address
        </button>
      </div>

      <div className="lg:flex-row md:flex-row flex xs:flex-col gap-7  justify-around py-10">
        <div className="max-w-md">
          {isOpenAddressBox && <AddAddress toogleState={isOpenAddressBox} />}
        </div>
        {addressList.map((addressData, index) => {
          return (
            <div
              key={addressData._id}
              className="max-w-md mx-auto p-4 bg-gray-100 border rounded-lg shadow-md"
            >
              <div className="flex justify-between">
                <h2 className="text-lg font-bold text-gray-700 mb-2">
                  Address Details
                </h2>
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
          );
        })}
      </div>
    </section>
  );
};

export default UserAddress;
