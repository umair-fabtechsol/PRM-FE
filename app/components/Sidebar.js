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

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");

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
    { name: "Calendar", icon: <FaCalendarAlt />, path: "/calendar" },
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
    { name: "Settings", icon: <FaCogs />, path: "/settings" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/logout" },
  ];

  return (
    <PrivateRoute>
      <div className="flex flex-col h-full p-2 ">
        <div className="text-xl text-blue-500 font-bold mb-6">Logo</div>

        <ul
          className="overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            WebkitScrollbar: "none",
          }}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer 
              ${active === link.name ? "bg-blue-500 text-white" : ""}`}
              onClick={() => setActive(link.name)}
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
          ))}
        </ul>
      </div>
    </PrivateRoute>
  );
};

export default Sidebar;
