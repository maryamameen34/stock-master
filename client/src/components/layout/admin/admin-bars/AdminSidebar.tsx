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
import axios from "axios";
import server from "../../../../server";

interface SidebarProps {
  collapseSidebar: boolean;
  sidebarCollapse: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  collapseSidebar,
  sidebarCollapse,
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [notificationCount, setNotificationCount] = useState<number>(0);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${server}/admin-notifications`, {
        withCredentials: true,
      });
      const notifications = response.data;

      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const recentNotifications = notifications.filter(
        (notification: any) =>
          new Date(notification.createdAt) > twentyFourHoursAgo
      );

      setNotificationCount(recentNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
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
      } shadow-lg  w-20 h-screen `}
    >
      <div className="flex items-center pl-3 justify-between">
        <div className=" text-center mx-auto text-lg">
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
              {collapseSidebar && (
                <>
                  Dashboard{" "}
                  <FaAngleDown
                    className={`${
                      collapseSidebar
                        ? "text-[17px] mt-[1px] mx-2 ml-auto"
                        : "text-lg"
                    } mr-1`}
                  />{" "}
                </>
              )}{" "}
            </NavLink>
            {openMenuIndex === 0 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={""}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Overview/Static
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={""}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Recent Activity
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {" "}
            <NavLink
              onClick={() => handleMenuClick(13)}
              to={""}
              className={`flex  font-semibold  text-lg ${
                collapseSidebar && "text-sm"
              }   ${
                openMenuIndex == 13 && "bg-violet-50 text-violet-700 "
              } p-1 rounded-full mx-auto`}
            >
              {" "}
              <FaUsers
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Users{" "}
                  <FaAngleDown
                    className={`${
                      collapseSidebar
                        ? "text-[17px] mt-[1px] mx-2 ml-auto"
                        : "text-lg"
                    } mr-1`}
                  />{" "}
                </>
              )}{" "}
            </NavLink>
            {openMenuIndex === 13 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/users/invite-user"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Invite User
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/users/users-record"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Users Record
                  </NavLink>
                </li>
              </ul>
            )}
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
                    to={"/admin-dashboard/product/add"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Add Item
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/inventory-products-data"}
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
              onClick={() => handleMenuClick(2)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }  ${
                openMenuIndex == 2 && "bg-violet-50 text-violet-700 "
              }   hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <MdBusinessCenter
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Supplier{" "}
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
            {openMenuIndex === 2 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/supplier/add-supplier"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Add New Supplier
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/supplier/suppliers-record"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    View Supplier List
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={""}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Supplier Reports
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {" "}
            <NavLink
              to={""}
              onClick={() => handleMenuClick(3)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }  ${
                openMenuIndex == 3 && "bg-violet-50 text-violet-700 "
              }   hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <FaRegUserCircle
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Coustomer{" "}
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
            {openMenuIndex === 3 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/customers/invite-customer"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                   Invite New Customer
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/customers/add-customer"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                   Add Customer
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/customers/customers-record"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    View Customer List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {" "}
            <NavLink
              to={""}
              onClick={() => handleMenuClick(13)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }  ${
                openMenuIndex == 13 && "bg-violet-50 text-violet-700 "
              }   hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <AiOutlineStock
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Stock Level{" "}
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
            {openMenuIndex === 13 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/stock-adjustement/create"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Add Stock Level
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/stock-adjustement/record"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Stock Records
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li>
            {" "}
            <NavLink
              to={""}
              onClick={() => handleMenuClick(12)}
              className={`flex  font-medium  text-lg ${
                collapseSidebar && "text-sm"
              }  ${
                openMenuIndex == 12 && "bg-violet-50 text-violet-700 "
              }   hover:text-blue-700 p-1 rounded-full mx-auto`}
            >
              {" "}
              <FaWarehouse
                className={`${
                  collapseSidebar
                    ? "text-[17px] mt-[1px] mx-2 "
                    : "text-xl ml-auto mr-auto"
                } mr-1  `}
              />{" "}
              {collapseSidebar && (
                <>
                  Ware Houses{" "}
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
            {openMenuIndex === 12 && (
              <ul
                className={`mt-3 ml-9 list-disc ${
                  !collapseSidebar && "hidden"
                }   text-blue-700 py-1 space-y-2`}
              >
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/ware-house/create-ware-house"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    Add WareHouse
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={"/admin-dashboard/ware-house/ware-house-record"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    {" "}
                    WareHouse List
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
                    to={"/admin-dashboard/orders-list"}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    View All Orders
                  </NavLink>
                </li>
                <li className="">
                  <NavLink
                    to={""}
                    className={`${
                      collapseSidebar ? "text-sm text-neutral-800" : ""
                    }`}
                  >
                    {" "}
                    Pending Orders
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <NavLink
              to="/admin-dashboard/notifications"
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
                  {notificationCount > 0 && (
                    <span className="bg-red-500 pt-0.5 text-white text-center rounded-full ml-auto px-2 text-xs mr-2">
                      {notificationCount}
                    </span>
                  )}{" "}
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
                    to={"profile-setting"}
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
                    Update Password
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

export default AdminSidebar;
