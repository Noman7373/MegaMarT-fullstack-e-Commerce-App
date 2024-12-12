import { useState } from "react";
import { deleteCategoryAxios } from "../../Api/Query/userQuery";

const DeleteConfirm = ({ closeDelete, categoryId, fetchCategory }) => {
  const [loading, setLoading] = useState("");
  const [message, setMessage] = useState("");

  const handleConfirmDelete = async (categoryId) => {
    if (!categoryId) {
      return setMessage("Id is requried");
    }

    setMessage("");
    setLoading(true);
    try {
      const response = await deleteCategoryAxios({ _id: categoryId });

      setMessage("");
      setLoading(false);
      if (response.data.success) {
        fetchCategory();
        closeDelete();
      }
    } catch (error) {
      setMessage("An error occured" || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="fixed inset-0 top-0 bottom-0 flex justify-center items-center left-0 right-0 bg-black bg-opacity-50 z-50">
        {message && <p>{message}</p>}
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={closeDelete}
            >
              Cancel
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => handleConfirmDelete(categoryId)}
            >
              {loading ? "Deleting" : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteConfirm;
