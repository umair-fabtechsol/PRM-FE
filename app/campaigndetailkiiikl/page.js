"use client";

import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/Header";
import { FaSearch, FaPlus, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function CampaignPage() {
  const users = [
    { id: 1, name: "User 1", image: "https://via.placeholder.com/50" },
    { id: 2, name: "User 2", image: "https://via.placeholder.com/50" },
    { id: 3, name: "User 3", image: "https://via.placeholder.com/50" },
    { id: 4, name: "User 4", image: "https://via.placeholder.com/50" },
    { id: 5, name: "User 5", image: "https://via.placeholder.com/50" },
    { id: 6, name: "User 6", image: "https://via.placeholder.com/50" },
    { id: 7, name: "User 7", image: "https://via.placeholder.com/50" },
  ];

  const maxVisible = 5;
  const visibleUsers = users.slice(0, maxVisible);
  const remainingUsersCount = users.length - maxVisible;
  return (
    <PrivateRoute>
      <Header
        title="Campaigns Management"
        description="createm, monitor and optimize your campiagns for maximum impect."
      />
      <div className="p-6 min-h-screen bg-transparent">
        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Name</p>
          <p className="text-gray-700 text-xs">John Doe</p>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Description</p>
          <p className="text-gray-700 text-xs">
            {" "}
            This is a dummy description text. It should be around 50 to 60 words
            in length. You can replace it with your actual data as needed. This
            is a dummy description text. It should be around 50 to 60 words in
            length. You can replace it with your actual data as needed. should
            be around 50 to 60 words in length. You can replace it with your
            actual data as needed.
          </p>
        </div>

        <div className="py-2 flex   font-sm mb-4">
          <div className="w-1/2 pr-2">
            <p className="text-black py-2  text-sm">Start Date</p>
            <p className="text-gray-700 text-xs">December 31, 2024</p>
          </div>
          <div className="w-1/2 pl-2">
            <p className="text-black py-2  text-sm">End Date</p>
            <p className="text-gray-700 text-xs">December 31, 2024</p>
          </div>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Budget</p>
          <p className="text-gray-700 text-xs">$20,000</p>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Revenue Target</p>
          <p className="text-gray-700 text-xs">$20,000</p>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Note</p>
          <p className="text-gray-700 text-xs">
            {" "}
            This is a note text. It contains approximately 30 words and can be
            replaced with actual information as required. This is a note text.
            It contains approximately 30 words and can be replaced with actual
            information as required.
          </p>
        </div>

        <div className="py-2   font-sm mb-4">
          <p className="text-black py-2  text-sm">Assests</p>
          <div className="flex space-x-1">
            <img src="/images/image.jpg" alt="Asset" className="w-16 h-16" />
            <img
              src="/images/image.jpg"
              alt="Asset"
              className="w-16 h-16"
            />{" "}
            <img src="/images/image.jpg" alt="Asset" className="w-16 h-16" />{" "}
            <img src="/images/image.jpg" alt="Asset" className="w-16 h-16" />
          </div>
        </div>

        <div className="py-2 font-sm mb-4">
          <p className="text-black py-2 text-sm ">Team Members</p>
          <div className="flex -space-x-2">
            {visibleUsers.map((user) => (
              <img
                key={user.id}
                src="/images/image.jpg"
                alt={user.name}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
            ))}
            {remainingUsersCount > 0 && (
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-green-500">
                +{remainingUsersCount}
              </div>
            )}
          </div>
        </div>

        <div className="py-2 font-sm mb-4">
          <p className="text-black py-2 text-sm ">Partner</p>
          <div className="flex -space-x-2">
            {visibleUsers.map((user) => (
              <img
                key={user.id}
                src="/images/image.jpg"
                alt={user.name}
                className="w-7 h-7 rounded-full border-2 border-white"
              />
            ))}
            {remainingUsersCount > 0 && (
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-green-500">
                +{remainingUsersCount}
              </div>
            )}
          </div>
        </div>

        <div className="py-2   my-2">
          <p className="text-black py-2  text-sm">Commission Plan</p>
          <p className="text-gray-700 text-xs">Select a Commission plan</p>
        </div>
      </div>
    </PrivateRoute>
  );
}
