// components/ProfilePictureUpload.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store";
import { uploadProfilePicture } from "../../redux/userSlice";
import { backendUrl } from "../../server";
import { FaAngleRight } from "react-icons/fa";

const ProfilePictureUpload: React.FC = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [isFileInputVisible, setFileInputVisible] = useState(false);

  const { user } = useSelector((state: RootState) => state.user);

  console.log("User:", user); // Log to confirm user object

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileInputVisible(false);
    }
  };

  const handleUpload = async () => {
    if (file && user && user._id) {
      const formData = new FormData();
      formData.append("profile_pic", file);
      formData.append("userId", user._id);
      await store.dispatch(uploadProfilePicture(formData));
      setFile(null);
      window.location.reload();
    } else {
      console.error("User ID is not defined or file is missing");
    }
  };

  return (
    <div>
      {user?.profile_pic ? (
        <div className="flex lg:px-48 items-center justify-between  mx-auto">
          <div className="relative">
            <label htmlFor="">
              <img
                src={`${backendUrl}/${user.profile_pic}`}
                alt="Profile"
                className="w-24 h-24 object-cover border border-gray-300 rounded-full"
              />
              <button
                onClick={() => setFileInputVisible(true)}
                className="mt-2"
              >
                {file ? "Present" : " Change"}
              </button>
            </label>
          </div>
          {isFileInputVisible && (
            <div className="flex items-center">
              <div className="min-w-48 h-1 bg-slate-400"></div>
              <div>
                <FaAngleRight />
              </div>
            </div>
          )}
          <div>
            {isFileInputVisible && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2"
              />
            )}
            {file && (
              <div>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Profile"
                  className="w-24 h-24 object-cover border border-gray-300 rounded-full"
                />
                <button onClick={handleUpload} className="mt-2">
                  Upload New
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
