import Table from "@/app/_components/ui/Table";
import Image from "next/image.js";
import React, { useEffect } from "react";
import { CommissionType } from "@/types";
import { useGetCommissionListQuery } from "@/app/store/apis/commissionApis";
import { useDispatch, useSelector } from "react-redux";
import { addCommission } from "@/app/store/slices/commissionSlice";
import { RootState } from "@/app/store/store";
import CustomLoader from "@/app/loader/CustomLoader";

export default function CommissionsTable() {
  const { data: commissionsList, isLoading } = useGetCommissionListQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (commissionsList?.data) {
      dispatch(addCommission(commissionsList?.data?.data));
    }
  }, [commissionsList, dispatch]);

  const commissions = useSelector(
    (state: RootState) => state.commission.commissions
  );

  const columns = React.useMemo(() => {
    return [
      {
        key: "commission_name" as keyof CommissionType,
        header: "Commission Name",
      },
      { key: "description" as keyof CommissionType, header: "Description" },
      { key: "type" as keyof CommissionType, header: "Commission Type" },
      { key: "processors" as keyof CommissionType, header: "payout frequency" },
      {
        key: "actions" as keyof CommissionType,
        header: "Actions",
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
    <div>
      {isLoading ? (
        <CustomLoader />
      ) : (
        <Table
          columns={columns}
          data={commissions}
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
