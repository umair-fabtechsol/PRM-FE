"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";

export default function CustomersPage() {
  return (
    <PrivateRoute>
      <div className="py-4 lg:px-6 px-3 min-h-screen">
        <div className="flex items-center justify-between  pb-4">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none bg-white text-gray-600 "
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

            <Link href="/dashboard/addcustomer">
              <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <FaPlus className="mr-2 text-sm" />
                Add New
              </button>
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-5">
          <table className="w-full rounded-md border-collapse border rounded shadow-md">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Email Address
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Tag
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Plan
                </th>

                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
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
                  <td className="px-4 py-3 flex items-center space-x-2 whitespace-nowrap">
                    <img
                      src="/images/image.jpg"
                      alt="User"
                      className="w-8 h-8 rounded-full"
                      style={{ maxWidth: "unset" }}
                    />
                    <div className="flex flex-col ml-2">
                      <span className="text-black text-sm font-medium">
                        John Doe for name part of user
                      </span>
                      <span className="text-gray-500 text-xs">User Title</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    johndoe@example.com
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    +1234567890
                  </td>

                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    <span
                      className={`${
                        {
                          0: "text-xs rounded-xl bg-red-100 text-red-500 px-3 py-1",
                          1: "text-xs rounded-xl bg-blue-100 text-blue-500 px-3 py-1",
                          3: "text-xs rounded-xl bg-green-100 text-green-500 px-3 py-1",
                        }[index % 3]
                      } rounded text-sm`}
                    >
                      {index % 3 === 0
                        ? "tag"
                        : index % 3 === 1
                        ? "tag"
                        : "tag"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    sub-plan
                  </td>

                  <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                    <button className="text-gray-700 hover:text-blue-700">
                      <img
                        src="/icons/usericon.png"
                        alt="Custom Icon"
                        className="w-4 h-4 mr-2"
                        style={{ maxWidth: "unset" }}
                      />
                    </button>
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