import React, { useEffect, useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import {
  FaAngleDown,
  FaLifeRing,
  FaRegUserCircle,
  FaUser,
} from "react-icons/fa";
import { MdBusinessCenter, MdOutlineInventory } from "react-icons/md";
import { RiMenuFold4Line } from "react-icons/ri";
import { HiOutlineChartBar, HiOutlineClipboardList } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { FaUsers, FaWarehouse } from "react-icons/fa6";
import server from "../../../server";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface SidebarProps {
  collapseSidebar: boolean;
  sidebarCollapse: () => void;
}

const CustomerSidebar: React.FC<SidebarProps> = ({
  collapseSidebar,
  sidebarCollapse,
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [notificationCount, setNotificationCount] = useState<number>(0);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const fetchNotifications = async () => {
    if (isAuthenticated && user?._id) {
      try {
        const response = await axios.get(
          `${server}/notifications/${user._id}`,
          { withCredentials: true }
        );
        setNotificationCount(response.data.notifications);
      } catch (err: any) {
        console.log("Failed to load notifications");
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMenuClick = (index: number) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  return (
    <aside
      className={`py-5 px-1 lg:${collapseSidebar == false} bg-white border-r ${
        collapseSidebar && "lg:w-52 min-w-52"
      } shadow-lg  w-16 h-screen `}
    >
      <div className="flex items-center pl-3 justify-between">
        <div className="text-center text-lg">
          <p
            className={`font-bold text-lg mb-2  text-gray-700 ${
              collapseSidebar && "text-[15px]"
            }`}
          >
            {" "}
            {collapseSidebar ? "Stock Master" : "SM"}{" "}
          </p>
        </div>
        <div className={`${collapseSidebar ? "mb-2" : "hidden"}`}>
          <button onClick={sidebarCollapse}>
            <IoClose className="text-2xl bg-gray-200 hover:bg-gray-300" />{" "}
          </button>
        </div>
      </div>
      <div className="pl-2 pt-5">
        <ul className=" space-y-5">
          <li>
            {" "}
            <NavLink
              onClick={() => handleMenuClick(0)}
              to={""}
              className={`flex  font-semibold  text-lg ${
                collapseSidebar && "text-sm"
              }   ${
                openMenuIndex == 0 && "bg-violet-50 text-violet-700 "
              } p-1 rounded-full mx-auto`}
            >
              {" "}
              <CiGrid41
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && <>Dashboard </>}{" "}
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              to={""}
              onClick={() => handleMenuClick(1)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }   ${
                openMenuIndex == 1 && "bg-violet-50 text-violet-700 "
              }  hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <MdOutlineInventory
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Inventory{" "}
                  <FaAngleDown
                    className={`${
                      collapseSidebar
                        ? "text-[17px] mt-[1px] mx-2  ml-auto"
                        : "text-lg"
                    } mr-1`}
                  />{" "}
                </>
              )}{" "}
            </NavLink>
            {openMenuIndex === 1 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/customer-dashboard/inventory-products-data"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    View Inventory
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {" "}
            <NavLink
              to={""}
              onClick={() => handleMenuClick(4)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }  ${
                openMenuIndex == 4 && "bg-violet-50 text-violet-700 "
              }   hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <HiOutlineClipboardList
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Orders{" "}
                  <FaAngleDown
                    className={`${
                      collapseSidebar
                        ? "text-[17px] mt-[1px] mx-2  ml-auto"
                        : "text-lg"
                    } mr-1`}
                  />{" "}
                </>
              )}{" "}
            </NavLink>
            {openMenuIndex === 4 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/customer-dashboard/my-orders"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    My Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            <NavLink
              to="/customer-dashboard/notifications"
              className={`flex font-medium text-lg items-center  ${
                collapseSidebar ? "text-sm" : ""
              } ${
                notificationCount > 0 ? "bg-violet-50 text-violet-700" : ""
              } hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              <IoMdNotifications
                className={`${
                  collapseSidebar
                    ? "text-[20px] mt-[1px]"
                    : "text-xl ml-auto mr-auto"
                } mr-1`}
              />
              {!collapseSidebar && (
                <>
                  <div className="w-[6px] h-[6px] mr-3 bg-red-600 rounded-full"></div>
                </>
              )}
              {collapseSidebar && (
                <>
                  Notifications{" "}
                  {notificationCount > 0 ? (
                    <span className="bg-red-500 pt-0.5 text-white text-center rounded-full ml-auto px-2 text-xs mr-2">
                      {notificationCount}
                    </span>
                  ) : (
                    <>
                      <span className="bg-red-500 pt-0.5 text-white text-center rounded-full ml-auto px-2 text-xs mr-2">
                        0
                      </span>
                    </>
                  )}
                </>
              )}
            </NavLink>
          </li>

          <div className="w-[90%] opacity-55 mx-auto h-[1px] bg-gray-500"></div>
          <li className="pt-6">
            {" "}
            <NavLink
              to={""}
              onClick={() => handleMenuClick(6)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }  ${
                openMenuIndex == 6 && "bg-violet-50 text-violet-700 "
              }   hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <IoSettingsOutline
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Settings{" "}
                  <FaAngleDown
                    className={`${
                      collapseSidebar
                        ? "text-[17px] mt-[1px] mx-2  ml-auto"
                        : "text-lg"
                    } mr-1`}
                  />{" "}
                </>
              )}{" "}
            </NavLink>
            {openMenuIndex === 6 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/customer-dashboard/profile-setting"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Profile Setting
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"settings/update-password"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Change Password
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
