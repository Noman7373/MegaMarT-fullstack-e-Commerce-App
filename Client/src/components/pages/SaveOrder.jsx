import { useEffect } from "react";
import useHook from "../../hooks/useHook";

const SaveOrder = () => {
  const { fetchOrderHistory, orderHistory } = useHook();

  useEffect(() => {
    fetchOrderHistory();
  }, []);
  return (
    <>
      <div className="h-[30rem] bg-gray-50 py-2 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Your Order History
          </h1>

          {orderHistory.length === 0 ? (
            <p className="text-center mt-6 text-gray-600">
              You have no orders yet. Start shopping now!
            </p>
          ) : (
            <div className="mt-6 space-y-6">
              {orderHistory.map((order) => (
                <div
                  key={order.orderId}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-semibold xs:text-[0.7rem] sm:text-[0.8rem] md:text-[0.9rem] lg:text-[1rem] text-gray-800">
                        Order ID: {order.orderId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Date: {order.createdAt}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded ${
                        order.payment_status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.payment_status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>

                  <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold">
                        Product Name:
                      </p>
                      <p className="text-gray-600">
                        {order.product_details.name}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold">
                        Total Amount:
                      </p>
                      <p className="text-gray-600">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                      <p className="text-gray-700 font-semibold">
                        Product Image:
                      </p>
                      <img
                        src={order.product_details.image[0]}
                        alt={order.product_details.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                      onClick={() =>
                        alert(`Viewing details for ${order.orderId}`)
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SaveOrder;
