import React from "react";

const SaveOrder = () => {
  return (
    <>
      (
      <div className="min-h-screen bg-gray-50 py-10 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Your Order History
          </h1>
          {orders.length === 0 ? (
            <p className="text-center mt-6 text-gray-600">
              You have no orders yet. Start shopping now!
            </p>
          ) : (
            <div className="mt-6">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800 font-medium">
                      Order ID
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800 font-medium">
                      Date
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800 font-medium">
                      Total Amount
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-gray-800 font-medium">
                      Status
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center text-gray-800 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-gray-700">
                        {order.orderId}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-700">
                        {order.date}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-700">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-gray-700">
                        <span
                          className={`px-2 py-1 text-sm font-medium rounded ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                          onClick={() =>
                            alert(`Viewing details for ${order.orderId}`)
                          }
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SaveOrder;
