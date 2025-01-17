import { Link } from "react-router-dom";

const CancelPayment = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-500">Payment Cancelled</h1>
        <p className="mt-4 text-gray-700">
          Your payment process has been cancelled. If you wish to try again, you
          can click the button below to return to the checkout page.
        </p>

        <div className="flex justify-between items-center p-2">
          <Link
            to={"/checkout"}
            className="p-2 bg-blue-500 text-white rounded hover:bg-transparent hover:text-black"
          >
            Return to Checkout
          </Link>
          <Link
            to={"/"}
            className="bg-gray-400 text-white p-2 rounded hover:bg-blue-500"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
