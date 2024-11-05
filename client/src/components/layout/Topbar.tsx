// Topbar.tsx
import React, { useEffect, useRef, useState } from "react";
import { RiMenuFold4Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import { backendUrl } from "../../server";

interface TopbarProps {
  sidebarCollapse: () => void;
  collapseSidebar: boolean;
}
const Topbar: React.FC<TopbarProps> = ({
  sidebarCollapse,
  collapseSidebar,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav
        className={`bg-white shadow-lg w-full fixed top-0 z-50 px-11 flex justify-between h-16 items-center ${
          collapseSidebar && "ml-16"
        }`}
      >
        <div className="flex ml-10 space-x-3">
          <button onClick={sidebarCollapse}>
            <RiMenuFold4Line className="text-xl" />
          </button>
          <p className={`font-medium text-lg ${collapseSidebar && "hidden"}`}>
            Stock Master
          </p>
        </div>
        <div
          className={`${collapseSidebar ? "lg:mr-44 md:mr-32 mr-24" : "mr-1"}`}
        >
          {user?.profile_pic ? (
            <>
              <img
               src={`${backendUrl}/${user.profile_pic ? user.profile_pic.replace(/\\/g, "/") : 'default-image-path'}`}
                alt="User Profile"
                className="rounded-full h-11 w-11 cursor-pointer"
                onClick={toggleDropdown}
                tabIndex={0}
              />
            </>
          ) : (
            <>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="User Profile"
                className="rounded-full h-11 w-11 cursor-pointer"
                onClick={toggleDropdown}
                tabIndex={0}
              />
            </>
          )}
        </div>
      </nav>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-14 mr-2 w-48 bg-white rounded-sm border-t-2 border-indigo-700 shadow-lg divide-y divide-gray-100"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900">
              {user && `${user.first_name} ${user.last_name}`}
            </span>
            <span className="block text-sm text-gray-500 truncate">
              {user && user.email}
            </span>
          </div>
          <ul className="py-2">
            <li>
              <Link
                to={`/${
                  user?.role === "admin"
                    ? "admin-dashboard"
                    : user?.role === "manager"
                    ? "manager-dashboard"
                    : "customer-dashboard"
                }/profile-setting`}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to={""}
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Topbar;
