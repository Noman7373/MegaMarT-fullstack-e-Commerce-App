import { FaRegCircleUser } from "react-icons/fa6";

const Register = () => {
  return (
    <div className="flex">
      <button className="text-gray-700 lg:hidden">
        <FaRegCircleUser size={30} />
      </button>

      <div className="xs:hidden sm:hidden md:hidden lg:block">
        <button className="p-2 bg-green-400 text-white">Register</button>
      </div>
    </div>
  );
};

export default Register;
