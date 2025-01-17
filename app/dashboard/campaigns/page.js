"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaSearch, FaPlus, FaArrowUp } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function CampiagnsPage() {
  const [campaignDeleteModal, setCompaingDeleteModal] = useState(false);

  const users = [
    // { id: 1, name: "User 1", image: "https://via.placeholder.com/50" },
    { id: 2, name: "User 2", image: "https://via.placeholder.com/50" },
    { id: 3, name: "User 3", image: "https://via.placeholder.com/50" },
    { id: 4, name: "User 4", image: "https://via.placeholder.com/50" },
    { id: 5, name: "User 5", image: "https://via.placeholder.com/50" },
    { id: 6, name: "User 6", image: "https://via.placeholder.com/50" },
    { id: 7, name: "User 7", image: "https://via.placeholder.com/50" },
    { id: 8, name: "User 8", image: "https://via.placeholder.com/50" },
    { id: 9, name: "User 9", image: "https://via.placeholder.com/50" },
    { id: 10, name: "User 10", image: "https://via.placeholder.com/50" },
  ];

  const maxVisible = 5;
  const remainingUsersCount = users.length - maxVisible;
  return (
    <PrivateRoute>
      {campaignDeleteModal && (
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
              Delete Campaign
            </h2>

            <p className="text-left  text-sm text-gray-500 mt-2">
              Are you sure you want to delete this campaign?
            </p>

            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => setCompaingDeleteModal(false)}
                className="w-full py-2 text-black border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setCompaingDeleteModal(false)}
                className="w-full py-2 text-white bg-red-700 rounded-lg shadow-sm hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="py-4 lg:px-6 px-3 min-h-screen bg-transparent">
        <div className="py-3 min-h-screen">
          <div className="flex items-center justify-between  pb-4">
            <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
              <FaSearch className="text-gray-700 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none bg-white text-gray-700"
              />
              <img
                src="/icons/union.png"
                alt="Custom Icon"
                className="w-4 h-4 ml-2"
              />
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center text-sm lg:px-4 px-3  py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
                <img
                  src="/icons/import.png"
                  alt="Custom Icon"
                  className="w-4 h-4 mr-2"
                />
                Export
              </button>

              <Link href="/dashboard/creatcompaign">
                <button className="flex text-sm items-center lg:px-4 px-3   py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  <FaPlus className="mr-2 text-sm" />
                  create New
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto mt-5">
            <table className="w-full rounded-md border-collapse border rounded shadow-md">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    Campiagn Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    status
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    start date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    end date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    revenew generated
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap">
                    participations
                  </th>

                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 7 }).map((_, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-sm">
                      for commission name
                    </td>

                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-sm">
                      <span
                        className={`${
                          {
                            0: "text-xs rounded-xl bg-red-100 text-red-500 px-2 py-1",
                            1: "text-xs rounded-xl bg-blue-100 text-blue-500 px-2 py-1",
                            2: "text-xs rounded-xl bg-green-100 text-green-500 px-2 py-1",
                          }[index % 3]
                        } rounded whitespace-nowrap text-sm`}
                      >
                        {index % 3 === 0
                          ? "ended"
                          : index % 3 === 1
                          ? "upcoming"
                          : "active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-sm">
                      sep 30 , 2024
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-sm">
                      sep 30 , 2024
                    </td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-sm">
                      $123,4345.00
                    </td>

                    <td className="pr-6 pl-2 whitespace-nowrap   py-2">
                      <div className="relative flex items-center">
                        {users.slice(0, maxVisible).map((user, index) => (
                          <img
                            key={user.id}
                            src="/images/image.jpg"
                            alt={user.name}
                            className="w-7 h-7 rounded-full object-cover border-2 border-white"
                            style={{
                              position: "absolute",
                              right: `${index * 16}px`,
                              zIndex: maxVisible - index,
                            }}
                          />
                        ))}
                        {remainingUsersCount > 0 && (
                          <div
                            className="w-6 h-6 rounded-full bg-white border border-gray-300 text-green-500 flex items-center justify-center text-xs  absolute"
                            style={{
                              right: `-${16}px`,
                              zIndex: maxVisible + 1,
                            }}
                            title={`+${remainingUsersCount} more`}
                          >
                            +{remainingUsersCount}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3 space-x-2 whitespace-nowrap">
                      <Link href="/dashboard/campaigndetail">
                        <button className="text-gray-700 hover:text-blue-700">
                          <img
                            src="/icons/comicon.png"
                            alt="Custom Icon"
                            className="w-4 h-4 mr-2"
                            style={{ maxWidth: "unset" }}
                          />
                        </button>
                      </Link>
                      <button
                        onClick={() => setCompaingDeleteModal(true)}
                        className="text-gray-700 hover:text-blue-700"
                      >
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
      </div>
    </PrivateRoute>
  );
}
