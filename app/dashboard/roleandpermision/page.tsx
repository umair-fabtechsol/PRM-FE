"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";
import RolesAndPermissionTable from "./_components/RoleAndPermissionsTable";
import Image from "next/image";

export default function RolesAndPermissionsPage() {
  const dummyData = [
    { text: "edit" },
    { text: "delete" },
    { text: "create" },
    { text: "new" },
    { text: "add" },
    { text: "read" },
    { text: "own" },
  ];
  return (
    <PrivateRoute>
      <div className="py-4 lg:px-6 px-3 min-h-screen">
        <div className="flex items-center justify-between  pb-4">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none bg-white"
            />

            <Image
              src="/icons/union.png"
              alt="Custom Icon"
              className="w-4 h-4 ml-2"
              width={40}
              height={40}
            />
          </div>

          <div className="flex space-x-4">
            <Link href="#">
              <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <FaPlus className="mr-2 text-sm" />
                Add New
              </button>
            </Link>
          </div>
        </div>

        <RolesAndPermissionTable />
      </div>
    </PrivateRoute>
  );
}
