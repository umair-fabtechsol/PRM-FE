import Table from "@/app/_components/ui/Table";
import Image from "next/image.js";
import React, { useEffect } from "react";
import { TeamMemberType } from "@/types";
import { useGetTeamMemberListQuery } from "@/app/store/apis/teamApis";
import { useDispatch, useSelector } from "react-redux";
import { addTeams } from "@/app/store/slices/teamSlice";
import { RootState } from "@/app/store/store";
import CustomLoader from "@/app/loader/CustomLoader";

export default function TeamMembersTable() {
  const { data: teamMemberList, isLoading } = useGetTeamMemberListQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (teamMemberList?.data) {
      dispatch(addTeams(teamMemberList?.data?.teamMembers));
    }
  }, [teamMemberList, dispatch]);

  const teams = useSelector((state: RootState) => state.team.teamMembers);

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
              src={"/images/image.jpg"}
              alt="User"
              className="rounded-full"
            />
            <div className="ml-2">
              <span className="text-black text-sm">{row?.name}</span>
              <br />
              <span className="text-gray-500 text-xs">{row?.userName}</span>
            </div>
          </div>
        ),
      },
      { key: "email" as keyof TeamMemberType, header: "Email Address" },
      { key: "contact" as keyof TeamMemberType, header: "Phone" },
      { key: "userType" as keyof TeamMemberType, header: "Role" },
      {
        key: "actions" as keyof TeamMemberType,
        header: "Actions",
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
                alt="Edit Icon"
              />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  if (isLoading) {
    <CustomLoader />;
  }

  return (
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Table
          columns={columns}
          data={teams}
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
              <div className="text-gray-600 text-sm text-right">
                Page 1 of 5
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
