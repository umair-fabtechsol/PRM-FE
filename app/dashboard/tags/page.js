"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function TagsPage() {
  return (
    <PrivateRoute>
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
        <div className="mt-5 overflow-x-auto">
          <table className="w-full rounded-md border-collapse border rounded shadow-md">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Tag Name
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  description
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Color
                </th>

                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap"></th>
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
                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    John Doe
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    this is for the description part of this
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm flex items-center space-x-2 whitespace-nowrap">
                    <div
                      className={`${
                        {
                          0: " w-8 h-8 rounded-full bg-gray-700",
                          1: " w-8 h-8 rounded-full bg-blue-700",
                          2: " w-8 h-8 rounded-full bg-green-700",
                        }[index % 3]
                      }`}
                    ></div>
                    <span className="px-4">
                      {index % 3 === 0
                        ? "for team"
                        : index % 3 === 1
                        ? "for plan"
                        : "for look"}
                    </span>
                  </td>

                  <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                    <button className="text-gray-700 hover:text-blue-700">
                      <img
                        src="/icons/delete.png"
                        alt="Custom Icon"
                        className="w-4 h-4 mr-2"
                        style={{ maxWidth: "unset" }}
                      />
                    </button>
                    <button className="text-gray-700 hover:text-blue-700">
                      <img
                        src="/icons/edit.png"
                        alt="Custom Icon"
                        className="w-4 h-4 mr-2"
                        style={{ maxWidth: "unset" }}
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
