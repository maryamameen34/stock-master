import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../../store";
import server from "../../../server";

const UserNotification = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isAuthenticated && user?._id) {
        try {
          const response = await axios.get(
            `${server}/notifications/${user._id}`,
            { withCredentials: true }
          );
          const allNotifications = response.data.notifications;

          // Filter notifications for the last 24 hours
          const now = new Date();
          const last24Hours = allNotifications.filter((notification: any) => {
            const notificationDate = new Date(notification.createdAt);
            return now.getTime() - notificationDate.getTime() <= 24 * 60 * 60 * 1000;
          });

          setNotifications(allNotifications);
          setFilteredNotifications(last24Hours);
        } catch (err: any) {
          setError("Failed to load notifications");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchNotifications();
  }, [isAuthenticated, user]);

  if (loading) return <p>Loading notifications...</p>;
  if (error) return <p>{error}</p>;

  const displayedNotifications = showAll ? notifications : filteredNotifications;

  return (
    <div className="container mx-auto p-6 mt-20">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        User Notifications
      </h2>
      {displayedNotifications.length > 0 ? (
        <ul className="space-y-4">
          {displayedNotifications.map((notification: any) => (
            <li
              key={notification._id}
              className={`p-4 rounded-md shadow-md transition-all duration-300 ${
                notification.read ? "bg-gray-200" : "bg-white"
              } hover:shadow-lg`}
            >
              <p className="text-lg font-medium">{notification.message}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <p>Previewed: {notification.read ? "Yes" : "No"}</p>
                <p className="text-right">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No notifications found.</p>
      )}

      {/* Show button if there are older notifications */}
      {notifications.length > filteredNotifications.length && !showAll && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            See Previous Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default UserNotification;
