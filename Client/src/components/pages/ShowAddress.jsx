import { useSelector } from "react-redux";

const ShowAddress = () => {
  // const addressList = useSelector((state) => state.address);
  // console.log(addressList);

  return (
    <div className="w-full mx-auto  p-4 bg-gray-100 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-700 mb-2">Address Details</h2>
      <div className="text-sm text-gray-600">
        <p>
          <span className="font-medium">State:</span> California
        </p>
        <p>
          <span className="font-medium">City:</span> Los Angeles
        </p>
        <p>
          <span className="font-medium">Mobile No:</span> +1 123 456 7890
        </p>
        <p>
          <span className="font-medium">Country:</span> USA
        </p>
      </div>
    </div>
  );
};

export default ShowAddress;
