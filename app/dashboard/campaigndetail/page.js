"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import Image from "next/image";
import Link from "next/link";

export default function CampaignDetailPage() {
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
      <div className="px-6 py-2 min-h-screen bg-transparent">
        <div className="my-2 flex justify-end">
          <Link href="#">
            <button className="text-gray-700 hover:text-blue-700 mx-2 px-2">
              <Image
                src="/icons/edit.png"
                alt="Custom Icon"
                className="w-6 h-6 "
                width={40}
                height={40}
              />
            </button>
          </Link>

          <Link href="#">
            <button className="text-gray-700 hover:text-blue-700 mx-2 px-2">
              <Image
                src="/icons/delete.png"
                alt="Custom Icon"
                className="w-6 h-6 "
                width={40}
                height={40}
              />
            </button>
          </Link>
        </div>

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
            <Image
              src="/images/avatar.png"
              alt="Asset"
              className="w-16 h-16"
              width={40}
              height={40}
            />
            <Image
              src="/images/avatar.png"
              alt="Asset"
              className="w-16 h-16"
              width={40}
              height={40}
            />
            <Image
              src="/images/avatar.png"
              alt="Asset"
              className="w-16 h-16"
              width={40}
              height={40}
            />{" "}
            <Image
              src="/images/avatar.png"
              alt="Asset"
              className="w-16 h-16"
              width={40}
              height={40}
            />{" "}
            <Image
              src="/images/avatar.png"
              alt="Asset"
              className="w-16 h-16"
              width={40}
              height={40}
            />
          </div>
        </div>

        <div className="py-2 font-sm mb-4">
          <p className="text-black py-2 text-sm ">Team Members</p>
          <div className="flex -space-x-2">
            {visibleUsers.map((user) => (
              <Image
                key={user.id}
                src="/images/avatar.png"
                alt={user.name}
                className="w-7 h-7 rounded-full border-2 border-white"
                width={40}
                height={40}
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
              <Image
                key={user.id}
                src="/images/avatar.png"
                alt={user.name}
                className="w-7 h-7 rounded-full border-2 border-white"
                width={40}
                height={40}
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
