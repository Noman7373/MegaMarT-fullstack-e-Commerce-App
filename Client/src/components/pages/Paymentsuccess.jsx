import { Link } from "react-router-dom";

const Paymentsuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-500">
          Payment Successful
        </h1>
        <p className="mt-4 text-gray-700">
          Thank you for your payment! Your transaction has been successfully
          processed.
        </p>
        <Link
          to={"/order/success"}
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
        >
          View Your Orders
        </Link>
        <Link
          to={"/"}
          className="mt-2 px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Paymentsuccess;
