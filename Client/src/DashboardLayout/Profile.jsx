import React, { useState } from "react";
import { FaUserLarge } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FETCH_STATUS } from "../components/status/fetchStatus";
import { updloadAvater } from "../Api/Query/userQuery";

const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAvatarImage = async (e) => {
    const uploadFile = e.target.files[0];
    if (!uploadFile) return;

    // file validation
    if (uploadFile.size > 5 * 1024 * 1024) {
      setErrorMessage("File size exceeds 5MB. Please choose a smaller file.");
      return;
    }
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("avatar", uploadFile);
      const response = await updloadAvater({ formData });
      console.log(response);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setErrorMessage("Failed to upload the avatar. Please try again.");
    }
  };

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
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="profile">
          {/* <div className="max-w-[8rem] cursor-pointer text-center text-sm px-3 py-2 mt-3 text-white bg-blue-600 rounded hover:bg-blue-400">
            Change Profile
          </div> */}
        </label>
        <input
          type="file"
          id="profile"
          accept="image/"
        //   className="hidden"
          onChange={handleAvatarImage}
        />
      </form>
    </div>
  );
};

export default Profile;
