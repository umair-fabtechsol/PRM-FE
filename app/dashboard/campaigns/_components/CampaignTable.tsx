import Table from "@/app/components/ui/Table";
import Image from "next/image.js";
import React from "react";
import { CampaignType } from "@/types";
import { CAMPAIGN_LIST } from "@/dummy-data";

export default function CampaignsTable() {
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
  const columns = React.useMemo(() => {
    return [
      {
        key: "name" as keyof CampaignType,
        header: "Campaign Name",
      },
      {
        key: "status" as keyof CampaignType,
        header: "Status",
        render: (value: any) => {
          const colorClasses: Record<string, string> = {
            Red: "bg-red-100 text-red-500",
            Blue: "bg-blue-100 text-blue-500",
            Green: "bg-green-100 text-green-500",
          };
          return (
            <span
              className={`text-xs px-2 py-1 rounded-xl ${colorClasses[value]}`}
            >
              {value}
            </span>
          );
        },
      },
      { key: "startDate" as keyof CampaignType, header: "Start Date" },
      { key: "endDate" as keyof CampaignType, header: "End Date" },
      { key: "revenew" as keyof CampaignType, header: "Revenew Generated" },
      {
        key: "imageUrl" as keyof CampaignType,
        header: "Participations",
        render: (value: any) => (
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
        ),
      },
      {
        key: "actions" as keyof CampaignType,
        header: "",
        render: () => (
          <div className="flex space-x-2">
            <button className="text-gray-700 hover:text-blue-700">
              <Image
                width={16}
                height={16}
                src="/icons/comicon.png"
                alt="Custom Icon"
              />
            </button>
            <button className="text-gray-700 hover:text-blue-700">
              <Image
                width={16}
                height={16}
                src="/icons/delete.png"
                alt="Delete Icon"
              />
            </button>
            <button className="text-gray-700 hover:text-blue-700">
              <Image
                width={16}
                height={16}
                src="/icons/edit.png"
                alt="Delete Icon"
              />
            </button>
          </div>
        ),
      },
    ];
  }, []);
  return (
    <Table
      columns={columns}
      data={CAMPAIGN_LIST}
      // TODO: create reusable pagination and use that
      bottomContent={
        <div className="flex justify-between items-center w-full">
          <div className="flex space-x-4 items-center">
            <button className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white text-gray-600 text-sm rounded-lg shadow hover:bg-gray-50 transition">
              Next
            </button>
          </div>
          <div className="text-gray-600 text-sm text-right">Page 1 of 5</div>
        </div>
      }
    />
  );
}
