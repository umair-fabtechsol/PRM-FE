import Table from "@/app/components/ui/Table";
import Image from "next/image.js";
import React from "react";
import { TeamMemberType } from "@/types";
import { TEAMMEMBER_LIST } from "@/dummy-data";

export default function TeamMembersTable() {
  const columns = React.useMemo(() => {
    return [
      {
        key: "imageUrl" as keyof TeamMemberType,
        header: "Member Name",
        render: (imageUrl: string, row: TeamMemberType) => (
          <div className="flex items-center space-x-2">
            <Image
              width={32}
              height={32}
              src={imageUrl}
              alt="User"
              className="rounded-full"
            />
            <div className="ml-2">
              <span className="text-black text-sm">{row?.name}</span>
              <br />
              <span className="text-gray-500 text-xs">User Title</span>
            </div>
          </div>
        ),
      },
      { key: "email" as keyof TeamMemberType, header: "Email Address" },
      { key: "phone" as keyof TeamMemberType, header: "Phone" },
      {
        key: "tags" as keyof TeamMemberType,
        header: "Tag",
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
      { key: "role" as keyof TeamMemberType, header: "Role" },
      {
        key: "actions" as keyof TeamMemberType,
        header: "",
        render: () => (
          <div className="flex space-x-2">
            <button className="text-gray-700 hover:text-blue-700">
              <Image
                width={16}
                height={16}
                src="/icons/usericon.png"
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
      data={TEAMMEMBER_LIST}
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
