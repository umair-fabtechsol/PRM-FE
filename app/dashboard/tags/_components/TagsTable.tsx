import Table from "@/app/components/ui/Table";
import Image from "next/image.js";
import React from "react";
import { TagsType } from "@/types";
import { TAGS_LIST } from "@/dummy-data";

export default function TagsTable() {
  const columns = React.useMemo(() => {
    return [
      { key: "name" as keyof TagsType, header: "Tag Name" },
      { key: "description" as keyof TagsType, header: "Description" },
      {
        key: "color" as keyof TagsType,
        header: "Color",
        render: (value: any) => {
          const colorClasses: Record<string, string> = {
            Black: "w-8 h-8 rounded-full bg-gray-700",
            Blue: "w-8 h-8 rounded-full bg-blue-700",
            Green: "w-8 h-8 rounded-full bg-green-700",
          };
          return (
            <td className="px-4 py-3 text-gray-700 text-sm flex items-center space-x-2 whitespace-nowrap">
                    <div
                      className={colorClasses[value]}
                    ></div>
                    <span className="px-4">
                      {value === 'Black'
                        ? "for team"
                        : value === 'Blue'
                        ? "for plan"
                        : "for look"}
                    </span>
                  </td>
          );
        },
      },
      {
        key: "actions" as keyof TagsType,
        header: "",
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
      data={TAGS_LIST}
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
