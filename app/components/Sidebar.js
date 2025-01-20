"use client";

import { useState } from "react";
import Link from "next/link";
import PrivateRoute from "./PrivateRoute";
import {
  FaHome,
  FaUsers,
  FaPercentage,
  FaBullhorn,
  FaUserFriends,
  FaUserCircle,
  FaTag,
  FaCalendarAlt,
  FaChartLine,
  FaWallet,
  FaShieldAlt,
  FaComments,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [logoutOpen, setLogoutOpen] = useState(false);

  //this is for getting path name
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Partners", icon: <FaUsers />, path: "/dashboard/partners" },
    {
      name: "Commissions",
      icon: <FaPercentage />,
      path: "/dashboard/commissions",
    },
    { name: "Campaign", icon: <FaBullhorn />, path: "/dashboard/campaigns" },
    {
      name: "Team Members",
      icon: <FaUserFriends />,
      path: "/dashboard/teammember",
    },
    { name: "Customers", icon: <FaUserCircle />, path: "/dashboard/customers" },
    { name: "Tags", icon: <FaTag />, path: "/dashboard/tags" },
    { name: "Calendar", icon: <FaCalendarAlt />, path: "/dashboard/calender" },
    {
      name: "Report & Analytics",
      icon: <FaChartLine />,
      path: "/dashboard/reportandanlytic",
    },
    { name: "Payouts", icon: <FaWallet />, path: "/dashboard/payouts" },
    {
      name: "Role & Permissions",
      icon: <FaShieldAlt />,
      path: "/dashboard/roleandpermision",
    },
    {
      name: "Communication",
      icon: <FaComments />,
      path: "/dashboard/communication",
    },
    { name: "Settings", icon: <FaCogs />, path: "/dashboard/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "#" },
  ];

  return (
    <PrivateRoute>
      {logoutOpen && (
        <div
          className="z-[9999] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ pointerEvents: "auto" }}
        >
          <div className="bg-white w-[350px] rounded-lg p-6 shadow-lg relative">
            <div className="flex justify-left my-2 text-red-500">
              <img
                src="/icons/logout.png"
                alt="Add Widget"
                className="mr-2"
                width={60}
                height={60}
              />
            </div>

            <h2 className="text-left p-2 text-lg font-bold text-black">
              Logout
            </h2>

            <p className="text-left  text-sm text-gray-500 mt-2">
              Are you sure you want to log out?
            </p>

            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => setLogoutOpen(false)}
                className="w-full py-2 text-gray-500 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setLogoutOpen(false)}
                className="w-full py-2 text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex bg-white flex-col border-r h-full p-2 ">
        <div className="text-xl text-blue-500 font-bold mb-6">Logo</div>

        <ul
          className="overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            WebkitScrollbar: "none",
          }}
        >
          {/* {links.map((link) => (
            <li
              key={link.name}
              className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer
              ${pathname === link.path ? "bg-blue-500 text-white" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                if (link.name === "Logout") {
                  setLogoutOpen(true);
                }
                setActive(link.name);
              }}
            >
              <Link href={link.path}>
                <div className="flex items-center w-full">
                  <div className="text-xl">{link.icon}</div>
                  <span className="ml-3 lg:inline-block hidden">
                    {link.name}
                  </span>
                </div>
              </Link>
            </li>
          ))} */}

          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer
      ${pathname === link.path ? "bg-blue-500 text-white" : ""}`}
              onClick={(e) => {
                if (link.name === "Logout") {
                  e.preventDefault(); // Logout ka modal dikhane ke liye prevent default
                  setLogoutOpen(true);
                  return;
                }
                setActive(link.name); // Active state ko set karna
              }}
            >
              <div className="flex items-center w-full">
                <div className="text-xl">{link.icon}</div>
                <span className="ml-3 lg:inline-block hidden">{link.name}</span>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </PrivateRoute>
  );
};

export default Sidebar;
