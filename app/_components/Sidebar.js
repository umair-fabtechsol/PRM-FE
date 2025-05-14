"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/app/_components/PrivateRoute";
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
  FaComments,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import CustomLoader from "../loader/CustomLoader";
import { toast } from "react-toastify";
import { ROLES } from "../constants/roles.constant";
import { useMemo } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const [filteredLinks, setFilteredLinks] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  const links = useMemo(
    () => [
      {
        name: "Dashboard",
        icon: <FaHome />,
        path: "/dashboard",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.TEAM_MEMBER,
          ROLES.PARTNER,
        ],
      },
      {
        name: "Partners",
        icon: <FaUsers />,
        path: "/dashboard/partners",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.TEAM_MEMBER],
      },
      {
        name: "Commissions",
        icon: <FaPercentage />,
        path: "/dashboard/commissions",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        name: "Campaign",
        icon: <FaBullhorn />,
        path: "/dashboard/campaigns",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.PARTNER,
          ROLES.TEAM_MEMBER,
        ],
      },
      {
        name: "Team Members",
        icon: <FaUserFriends />,
        path: "/dashboard/teammember",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
      {
        name: "Customers",
        icon: <FaUserCircle />,
        path: "/dashboard/customers",
        roles: [ROLES.SUPER_ADMIN],
      },
      {
        name: "Tags",
        icon: <FaTag />,
        path: "/dashboard/tags",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.TEAM_MEMBER],
      },
      {
        name: "Calendar",
        icon: <FaCalendarAlt />,
        path: "/dashboard/calender",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.TEAM_MEMBER,
          ROLES.PARTNER,
        ],
      },
      {
        name: "Report & Analytics",
        icon: <FaChartLine />,
        path: "/dashboard/reportandanlytic",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.TEAM_MEMBER,
          ROLES.PARTNER,
        ],
      },
      {
        name: "Payouts",
        icon: <FaWallet />,
        path: "/dashboard/payouts",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.PARTNER],
      },
      {
        name: "Communication",
        icon: <FaComments />,
        path: "/dashboard/communication",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.TEAM_MEMBER,
          ROLES.PARTNER,
        ],
      },
      {
        name: "Settings",
        icon: <FaCogs />,
        path: "/dashboard/settings",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.TEAM_MEMBER,
          ROLES.PARTNER,
        ],
      },
      {
        name: "Logout",
        icon: <FaSignOutAlt />,
        path: "#",
        roles: [
          ROLES.SUPER_ADMIN,
          ROLES.ADMIN,
          ROLES.TEAM_MEMBER,
          ROLES.PARTNER,
        ],
      },
    ],
    []
  );

  useEffect(() => {
    const currentUser = localStorage.getItem("user");

    if (currentUser) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);

        const userRole = parsedUser?.role;
        const sidebarLinks = links.filter((link) =>
          link.roles.includes(userRole)
        );

        setFilteredLinks(sidebarLinks);
      } catch (error) {
        console.error("Invalid user JSON", error);
      }
    }
  }, [links]);

  return (
    <PrivateRoute>
      {logoutOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          style={{ pointerEvents: "auto" }}
        >
          <div className="bg-white w-[350px] rounded-lg p-6 shadow-lg relative">
            <div className="flex justify-left my-2 text-red-500">
              <Image
                src={"/icons/logout.png"}
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

            {isLoggingOut ? (
              <div className="py-4">
                <CustomLoader />
              </div>
            ) : (
              <div className="mt-6 flex justify-between gap-4">
                <button
                  onClick={() => setLogoutOpen(false)}
                  className="w-full py-2 text-gray-500 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsLoggingOut(true);
                    localStorage.clear();
                    toast.success("Logout Successfully");
                    setTimeout(() => {
                      router.push("/");
                    }, 500);
                  }}
                  className="w-full py-2 text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col bg-white border-r h-full p-2">
        <div className="text-xl text-blue-500 font-bold mb-6">Logo</div>

        {/* All non-logout links in scrollable area */}
        <div
          className="flex flex-col flex-grow overflow-y-auto"
          style={{ scrollbarWidth: "none", WebkitScrollbar: "none" }}
        >
          {filteredLinks
            ?.filter((link) => link.name !== "Logout")
            .map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`flex items-center p-3 mb-4 rounded-lg cursor-pointer ${
                  pathname === link.path
                    ? "bg-blue-500 text-white"
                    : "text-black"
                }`}
                onClick={() => setActive(link.name)}
              >
                <div className="flex items-center w-full">
                  <div className="text-xl">{link.icon}</div>
                  <span className="ml-3 lg:inline-block hidden">
                    {link.name}
                  </span>
                </div>
              </Link>
            ))}
        </div>

        {filteredLinks?.find((link) => link.name === "Logout") && (
          <button
            className="flex items-center p-3 rounded-lg cursor-pointer text-black hover:bg-gray-100"
            onClick={() => setLogoutOpen(true)}
          >
            <div className="flex items-center w-full">
              <div className="text-xl">
                <FaSignOutAlt />
              </div>
              <span className="ml-3 lg:inline-block hidden">Logout</span>
            </div>
          </button>
        )}
      </div>
    </PrivateRoute>
  );
};

export default Sidebar;
