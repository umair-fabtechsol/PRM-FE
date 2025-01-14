"use client";

import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/Header";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";

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
      <Header
        title="Role & Permissions"
        description="manage team roles and permissions to control access and ensure secure efficient collaboration"
      />
      <div className="p-6 min-h-screen">
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
            <Link href="#">
              <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <FaPlus className="mr-2 text-sm" />
                Add New
              </button>
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="mt-6">
          <table className="w-full rounded-md border-collapse border rounded shadow-md">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                  Role title
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                  Permissions
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                  Created Date
                </th>

                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <span className="text-black text-sm font-medium">
                      John Doe
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {dummyData.map((item, index) => (
                        <span
                          key={index}
                          className="border border-gray-300 text-gray-700 text-xs px-1 rounded"
                        >
                          {item.text}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-sm">
                    dec, 07 2024 9:32pm
                  </td>

                  <td className="px-4 py-3 space-x-2">
                    <button className="text-gray-700 hover:text-blue-700"></button>
                    <button className="text-gray-700 hover:text-blue-700">
                      <img
                        src="/icons/delete.png"
                        alt="Custom Icon"
                        className="w-4 h-4 mr-2"
                      />
                    </button>
                    <button className="text-gray-700 hover:text-blue-700">
                      <img
                        src="/icons/edit.png"
                        alt="Custom Icon"
                        className="w-4 h-4 mr-2"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-100 border-t">
              <tr>
                <td colSpan="7" className="px-4 py-3">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex space-x-4 items-center">
                      <button className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition">
                        Previous
                      </button>
                      <button className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition">
                        Next
                      </button>
                    </div>
                    <div className="text-gray-600 text-sm text-right">
                      Page 1 of 5
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </PrivateRoute>
  );
}
