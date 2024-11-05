// components/ProfileSettings.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../../store";
import { updateUserProfile, loadLoggedinUser } from "../../redux/userSlice";
import ProfilePictureUpload from "./UpdateProfilePic";

const ProfileSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user, error, loading } = useSelector(
    (state: RootState) => state.user
  );

  const [first_name, setfirst_name] = useState<string>("");
  const [last_name, setlast_name] = useState<string>("");

  useEffect(() => {
    if (user) {
      setfirst_name(user.first_name);
      setlast_name(user.last_name);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.dispatch(updateUserProfile({ first_name, last_name }));
    window.location.reload()
  };

  return (
    <div className="container mx-auto mt-20 p-4">
      <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

      <ProfilePictureUpload />
      {isAuthenticated ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="first_name"
                className="text-gray-700 text-lg mb-1"
              >
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="last_name" className="text-gray-700 text-lg mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="email" className="text-gray-700 text-lg mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={user?.email || ""}
              disabled
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              readOnly
            />
            <p className="text-sm ml-1 text-gray-600">Email can't be changed</p>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {loading ? (
            <p className="text-blue-500 mt-2">Saving changes...</p>
          ) : (
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-200"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      ) : (
        <p className="text-red-600">
          You need to be logged in to update your profile.
        </p>
      )}
    </div>
  );
};

export default ProfileSettings;
