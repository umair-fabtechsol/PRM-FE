import Table from "@/app/_components/ui/Table";
import Image from "next/image.js";
import React from "react";
import { TagsType } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

export default function TagsTable() {
  const tags = useSelector((state: RootState) => state?.tag?.tags);

  const columns = React.useMemo(() => {
    return [
      { key: "tagName" as keyof TagsType, header: "Tag Name" },
      { key: "description" as keyof TagsType, header: "Description" },
      { key: "role" as keyof TagsType, header: "Role" },
      {
        key: "tagColor" as keyof TagsType,
        header: "Color",
        render: (value: string) => (
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded-full border"
              style={{ backgroundColor: value }}
            ></div>
            <span className="px-2 text-xs">{value}</span>
          </div>
        ),
      },
      {
        key: "actions" as keyof TagsType,
        header: "Actions",
        render: () => (
          <div className="flex space-x-2">
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
      data={tags}
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
