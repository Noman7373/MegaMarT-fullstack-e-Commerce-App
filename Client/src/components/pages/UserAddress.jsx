import { useSelector } from "react-redux";
import AddAddress from "./AddAddress";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useHook from "../../hooks/useHook";
import DeleteConfirmation from "../../utils/DeleteConfirmation";
import { deleteUserAddressAxios } from "../../Api/Query/userQuery";
import UpdateAddress from "./UpdateAddress";
import { Link } from "react-router-dom";
const UserAddress = () => {
  const addressList = useSelector((state) => state.address.addressList);
  const user = useSelector((state) => state?.user);
  // console.log("user", user._id);

  const { fetchAddressDetails } = useHook();
  const [isOpenAddressBox, setIsOpenAddressBox] = useState(true);
  const [isOpenEditBox, setIsOpenEditBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Delete User Address
  const handleDeleteAddress = async (_id) => {
    setLoading(true);
    try {
      const response = await deleteUserAddressAxios(_id);
      setLoading(false);
      if (response.success) {
        fetchAddressDetails(user?._id);
      }
    } catch (error) {
      throw new Error("An error occured try again", error.message);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center p-2 bg-white shadow-md ">
        <h1 className="font-semibold">Address</h1>
        {/* <button
          //   onClick={() => setIsUploadCategory(true)}
          className="bg-green-600 p-2 text-white rounded hover:bg-green-700"
        >
          Add Address
        </button> */}
      </div>
      <div className="flex lg:flex-row justify-around sm:flex-col xs:flex-col md:flex-col">
        <div className="w-full p-4 mt-5">
          {isOpenAddressBox && <AddAddress toogleState={isOpenAddressBox} />}
        </div>
        <div className="grid lg:grid-cols-2 xs:grid-cols-1 gap-7 py-10 h-[55vh] border-l overflow-y-auto custom-scrollbar w-full overflow-x-hidden">
          {addressList.map((addressData, index) => {
            const { _id, address_line, city, state, pincode, country, mobile } =
              addressData;
            return (
              <div
                key={_id}
                className="lg:w-[15rem] ml-3 mx-auto p-4 bg-gray-100 border rounded-lg shadow-md sm:w-full xs:w-full"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold text-gray-700 mb-2">
                    Address Details
                  </h2>
                  <div className="flex gap-2 ">
                    <Link
                      to={`/dashboard/update-address/${_id}`}
                      state={{
                        address_line,
                        city,
                        state,
                        pincode,
                        country,
                        mobile,
                      }}
                      className="text-blue-500 hover:underline"
                    >
                      <FaEdit
                        size={20}
                        className="cursor-pointer hover:text-[#16A34A]"
                      />
                    </Link>
                    <MdDelete
                      size={20}
                      className="cursor-pointer hover:text-[#16A34A]"
                      onClick={() => handleDeleteAddress(_id)}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Address_Line:</span>{" "}
                    {address_line}
                  </p>
                  <p>
                    <span className="font-medium">City:</span> {city}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span> {country}
                  </p>
                  <p>
                    <span className="font-medium">PinCode:</span> {pincode}
                  </p>
                  <p>
                    <span className="font-medium">Mobile No:</span> {mobile}
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

      {/* Update Address Component */}
      {isOpenEditBox && (
        <UpdateAddress closePage={() => setIsOpenEditBox(false)} />
      )}
    </section>
  );
};

export default UserAddress;
