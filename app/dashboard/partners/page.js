"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function PartnerPage() {
  const [deleteModal, setDelteModal] = useState(false);

  return (
    <PrivateRoute>
      {deleteModal && (
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
              Delete User
            </h2>

            <p className="text-left  text-sm text-gray-500 mt-2">
              Are you sure you want to delete this user?
            </p>

            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => setDelteModal(false)}
                className="w-full py-2 text-black border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setDelteModal(false)}
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
          <div className="flex items-center border border-gray-300 rounded px-2 py-2 w-full max-w-sm bg-white md:max-w-xs lg:max-w-sm">
            <FaSearch className="text-gray-500 mr-2 text-base md:text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none bg-white text-gray-700 text-base md:text-sm"
            />
            <img
              src="/icons/union.png"
              alt="Custom Icon"
              className="w-5 h-5 ml-2 md:w-4 md:h-4"
            />
          </div>

          <div className="flex space-x-2 lg:space-x-4">
            <button className="flex items-center text-sm lg:px-4 px-3 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
              <img
                src="/icons/import.png"
                alt="Custom Icon"
                className="w-4 h-4 mr-2"
              />
              Export
            </button>

            <button className="flex items-center text-sm lg:px-4 px-3 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
              <img
                src="/icons/export.png"
                alt="Custom Icon"
                className="w-4 h-4 mr-2"
              />
              Import
            </button>

            <Link href="/dashboard/addpartner">
              <button className="flex text-sm items-center lg:px-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                <FaPlus className="mr-2 text-sm" />
                Add New
              </button>
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full rounded-md border-collapse border rounded shadow-md">
            <thead className="bg-white border-b">
              <tr>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                  Tags
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
                  <td className="px-4 py-3 flex items-center space-x-2 whitespace-nowrap">
                    <img
                      src="/images/image.jpg"
                      alt="User"
                      className="w-8 h-8 rounded-full"
                      style={{ maxWidth: "unset" }}
                    />
                    <div className="flex flex-col ml-2">
                      <span className="text-black text-sm ">
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
                    Tech Company
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    Partner
                  </td>
                  <td className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">
                    <span
                      className={`${
                        {
                          0: "text-xs rounded-xl bg-red-100 text-red-500 px-2 py-1",
                          1: "text-xs rounded-xl bg-blue-100 text-blue-500 px-2 py-1",
                          2: "text-xs rounded-xl bg-green-100 text-green-500 px-2 py-1",
                        }[index % 3]
                      } rounded text-sm`}
                    >
                      {index % 3 === 0
                        ? "Text for Red"
                        : index % 3 === 1
                        ? "Text for Blue"
                        : "Text for Green"}
                    </span>
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
                    <button
                      onClick={() => setDelteModal(true)}
                      className="text-gray-700 hover:text-blue-700"
                    >
                      <img
                        src="/icons/delete.png"
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
