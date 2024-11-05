import React, { useEffect, useState } from "react";
import axios from "axios";
import server from "../../../server";

const AllNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(
        `${server}/admin-notifications`, { withCredentials: true }
      );
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Notifications
      </h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {notifications.length > 0 ? (
          notifications.map((notification: any) => (
            <div
              key={notification._id}
              className="p-5 border-b last:border-b-0 hover:bg-gray-100 transition duration-300"
            >
              {notification.admin_message && (
                <div className="flex flex-col">
                  <p className="text-lg text-gray-700 font-medium">
                    {notification.admin_message}
                  </p>
                  <span className="text-sm text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center p-6 text-gray-500">
            No notifications available.
          </p>
        )}
      </div>
      <div className="mt-4 text-center">
        <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-200">
          Refresh Notifications
        </button>
      </div>
    </div>
  );
};
export default AllNotifications;
