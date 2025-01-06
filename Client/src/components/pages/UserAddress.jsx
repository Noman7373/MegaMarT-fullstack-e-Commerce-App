import { useSelector } from "react-redux";
import AddAddress from "./AddAddress";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useHook from "../../hooks/useHook";
import DeleteConfirmation from "../../utils/DeleteConfirmation";
import { deleteUserAddressAxios } from "../../Api/Query/userQuery";
const UserAddress = () => {
  const addressList = useSelector((state) => state.address.addressList);
  const { fetchAddressDetails } = useHook();
  const [isOpenAddressBox, setIsOpenAddressBox] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log(addressList);

  const [isOpen, setIsOpen] = useState(false);

  // Delete User Address
  const handleDeleteAddress = async (_id) => {
    setLoading(true);
    try {
      const response = await deleteUserAddressAxios(_id);
      setLoading(false);
      if (response.success) {
        fetchAddressDetails(_id);
      }
    } catch (error) {
      throw new Error("An error occured try again", error.message);
    }
  };

  // useEffect(() => {
  //   fetchAddressDetails();
  // }, []);

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
      <div className="flex justify-between">
        <div className="max-w-md p-4 mt-5">
          {isOpenAddressBox && <AddAddress toogleState={isOpenAddressBox} />}
        </div>
        <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-7 py-10 h-[65vh] border-l overflow-y-auto custom-scrollbar">
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
                  <div className="flex gap-2 ">
                    <FaEdit
                      size={20}
                      className="cursor-pointer hover:text-[#16A34A]"
                    />
                    <MdDelete
                      size={20}
                      className="cursor-pointer hover:text-[#16A34A]"
                      onClick={() => handleDeleteAddress(addressData._id)}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Address_Line:</span>{" "}
                    {addressData.address_line}
                  </p>
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {addressData.city}
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
      </div>

      {isOpen && (
        <DeleteConfirmation
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          // onConfirm={handleDeleteAddress}
        />
      )}
    </section>
  );
};

export default UserAddress;
