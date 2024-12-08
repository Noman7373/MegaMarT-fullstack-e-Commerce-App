import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="w-20 h-20 flex justify-center items-center rounded overflow-hidden drop-shadow-lg">
          {user?.avater ? (
            <img
              src={user?.avater}
              alt={user?.name}
              className="h-full w-full object-scale-down"
            />
          ) : (
            <FaUserLarge size={65} />
          )}
        </div>
        <div>
          <h2 className="font-semibold">File Smaller than 5MB</h2>
          <p className="text-gray-400 hidden sm:block">
            This image will be show in the members directory and your profile
            page
            <br />
            if you choose to share it with other members. It will also help us
            recognize you!
          </p>
        </div>
      </div>
      <button className="text-sm px-3 py-2 mt-3 text-white bg-green-600 rounded">
        Change Profile
      </button>
    </div>
  );
};

export default Profile;
