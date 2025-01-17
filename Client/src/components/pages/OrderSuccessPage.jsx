
const OrderSuccessPage = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mt-4 text-gray-800">
          Thank You for Your Order!
        </h1>
        <p className="mt-2 text-gray-600">
          Your order has been placed successfully. We’ll notify you once it’s
          shipped.
        </p>
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => (window.location.href = "/dashboard/save-order")}
            className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
