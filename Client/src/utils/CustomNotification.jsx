import { useEffect } from "react";

const CustomNotification = ({ Notification }) => {
  const { message, type, isVisible, setIsVisible } = Notification;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the notification after 3 seconds
      }, 3000); // 3 seconds
      return () => clearTimeout(timer); // Clean up the timeout if the component unmounts
    }
  }, [isVisible, setIsVisible]);

  const notificationStyles =
    type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white";

  return (
    isVisible && (
      <div
        className={`fixed top-4 z-50 left-4 p-4 rounded-md shadow-lg ${notificationStyles} transform transition-all duration-100 ease-linear`}
      >
        <div className="flex items-center">
          {/* Notification Icon */}
          <span className="mr-2">
            {type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
          {/* Notification message */}
          <span>{message}</span>
        </div>
      </div>
    )
  );
};

export default CustomNotification;
