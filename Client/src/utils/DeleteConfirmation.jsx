import React from "react";

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?",
  title = "Confirm Delete",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center top-0 left-0 right-0 bottom-0 z-40 items-center">
      <div className="bg-white p-5 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-3">{title}</h2>
        <p className="mb-5">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
