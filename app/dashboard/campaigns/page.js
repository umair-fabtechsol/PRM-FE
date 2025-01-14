"use client";

import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/Header";
import { FaSearch, FaPlus, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function CampiagnsPage() {
  const users = [
    { id: 1, name: "User 1", image: "https://via.placeholder.com/50" },
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

  const maxVisible = 5; // Maximum number of images to show
  const remainingUsersCount = users.length - maxVisible;
  return (
    <PrivateRoute>
      <Header
        title="Campaigns Management"
        description="createm, monitor and optimize your campiagns for maximum impect."
      />
      <div className="p-6 min-h-screen bg-transparent">
        <div className="py-6 min-h-screen">
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

              <Link href="/dashboard/addpartner">
                <button className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                  <FaPlus className="mr-2 text-sm" />
                  create New
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-6">
            <table className="w-full rounded-md border-collapse border rounded shadow-md">
              <thead className="bg-white border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Campiagn Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    status
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    start date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    end date
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    revenew generated
                  </th>
                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    participations
                  </th>

                  <th className="px-4 py-3 text-left text-gray-700 text-xs font-medium">
                    Actions
                  </th>
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
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      for commission name
                    </td>

                    <td className="px-4 py-3 text-gray-700 text-sm">
                      <span
                        className={`${
                          {
                            0: "text-xs rounded-xl bg-red-300 text-red-700 p-1",
                            1: "text-xs rounded-xl bg-blue-300 text-blue-700 p-1",
                            2: "text-xs rounded-xl bg-green-300 text-green-700 p-1",
                          }[index % 3]
                        } rounded text-sm`}
                      >
                        {index % 3 === 0
                          ? "ended"
                          : index % 3 === 1
                          ? "upcoming"
                          : "active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      sep 30 , 2024
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      sep 30 , 2024
                    </td>
                    <td className="px-4 py-3 text-gray-700 text-sm">
                      $123,4345.00
                    </td>

                    <td className="px-4 py-2">
                      <div className="relative flex items-center">
                        {users.slice(0, maxVisible).map((user, index) => (
                          <img
                            key={user.id}
                            src="/images/image.jpg"
                            alt={user.name}
                            className="w-6 h-6 rounded-full object-cover"
                            style={{
                              position: "absolute",
                              right: `${index * 16}px`, // Spacing between images
                              zIndex: maxVisible - index, // Ensures the last image is on top
                            }}
                          />
                        ))}
                        {remainingUsersCount > 0 && (
                          <div
                            className="w-6 h-6 rounded-full bg-white border border-gray-300 text-green-500 flex items-center justify-center text-xs absolute"
                            style={{
                              left: `${maxVisible * 16 - 1}px`, // Position "+X" circle after images and overlap last image
                              zIndex: maxVisible, // Ensures the +X badge overlaps the last image
                            }}
                            title={`+${remainingUsersCount} more`}
                          >
                            +{remainingUsersCount}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3 space-x-2">
                      <button className="text-gray-700 hover:text-blue-700">
                        <img
                          src="/icons/comicon.png"
                          alt="Custom Icon"
                          className="w-4 h-4 mr-2"
                        />
                      </button>
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
      </div>
    </PrivateRoute>
  );
}
