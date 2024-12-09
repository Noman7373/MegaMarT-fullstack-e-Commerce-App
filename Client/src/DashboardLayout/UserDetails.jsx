import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { updateUserDetails } from "../Api/Query/userQuery";

const UserDetails = () => {
  const user = useSelector((state) => state.user);
  //   console.log(user);

  const { _id, name, email, mobile } = user;

  const [userDetails, setUserDetails] = useState({
    name,
    email,
    mobile,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    setUserDetails({
      name,
      email,
      mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await updateUserDetails({ _id, name, email, mobile });
      if (response.data.success) {
        setIsloading(false);
        
      }
    } catch (error) {
      setIsloading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-3 sm:grid-cols-1 xs:grid col-1 lg:max-w-[60%]">
          <div className="flex flex-col border-[1px] border-dotted border-gray-400 rounded-md p-1 h-20">
            <label htmlFor="name">Name</label>
            <input
              className="bg-[#F2F2F2] outline-0 p-2 rounded-md"
              type="text"
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col border-[1px] border-dotted border-gray-400 rounded-md p-1 h-20">
            <label htmlFor="email">Email</label>
            <input
              className="bg-[#F2F2F2] outline-0 p-2 rounded-md"
              type="text"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col border-[1px] border-dotted border-gray-400 rounded-md p-1 h-20">
            <label htmlFor="mobile">Mobile No</label>
            <input
              className="bg-[#F2F2F2] outline-0 p-2 rounded-md"
              type="text"
              id="mobile"
              name="mobile"
              value={userDetails.mobile || "00000000"}
              onChange={handleOnChange}
            />
          </div>
          <button className="bg-[#F2F2F2] lg:mt-auto lg:ml-auto p-3 rounded hover:bg-[#bdb5b5] hover:text-white xs:w-full">
            Edit Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default UserDetails;
