"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import TeamMembersTable from "./_components/TeamMembersTable";

export default function TeamMemberPage() {
  const [deleteAdminModal, setDeleteAdminModal] = useState(false);
  return (
    <PrivateRoute>
      {deleteAdminModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[350px] rounded-lg p-6 shadow-lg relative">
            <div className="flex justify-left my-2 text-red-500">
              <img
                src="/icons/deleteicon.png"
                alt="Add Widget"
                className="mr-2"
                width={60}
                height={60}
              />
            </div>

            <h2 className="text-left p-2 text-lg font-semibold text-black">
              Delete Admin
            </h2>

            <p className="text-left  text-sm text-gray-500 mt-2">
              Are you sure you want to delete this team member?
            </p>

            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => setDeleteAdminModal(false)}
                className="w-full py-2 text-black border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setDeleteAdminModal(false)}
                className="w-full py-2 text-white bg-red-700 rounded-lg shadow-sm hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="py-4 lg:px-6 px-3 min-h-screen">
        <div className="flex items-center justify-between  pb-4">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none bg-white"
            />
            <img
              src="/icons/union.png"
              alt="Custom Icon"
              className="w-4 h-4 ml-2"
            />
          </div>

          <div className="flex space-x-4">
            <button className="flex items-center text-sm px-4 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
              <img
                src="/icons/import.png"
                alt="Custom Icon"
                className="w-4 h-4 mr-2"
              />
              Export
            </button>

            <Link href="/dashboard/addteammember">
              <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <FaPlus className="mr-2 text-sm" />
                Add New
              </button>
            </Link>
          </div>
        </div>

        <TeamMembersTable />
      </div>
    </PrivateRoute>
  );
}
