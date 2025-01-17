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
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          onClick={() => (window.location.href = "/order/success")}
        >
          View Your Orders
        </button>
        <button
          className="mt-2 px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
          onClick={() => (window.location.href = "/home")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Paymentsuccess;
