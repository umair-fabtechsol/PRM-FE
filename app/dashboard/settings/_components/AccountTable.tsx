import Table from "@/app/_components/ui/Table";
import Image from "next/image.js";
import React, { useEffect } from "react";
import { AccountType, FeaureType } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { addFeature } from "@/app/store/slices/featureSlice";
import { RootState } from "@/app/store/store";
import CustomLoader from "@/app/loader/CustomLoader";
import { useCreateClientSecretForPaymentMutation, useGetBankAccountsListQuery } from "@/app/store/apis/accountOnboardingApis";
import { addBankAccount } from "@/app/store/slices/accountSlice";

export default function AccountTable() {
  const { data: getBankAccountsList, isLoading } =
    useGetBankAccountsListQuery();
    const [createClientSecretForPayment ,{isLoading: postLoading}] = useCreateClientSecretForPaymentMutation()
  const dispatch = useDispatch();

  useEffect(() => {
    if (getBankAccountsList?.bankAccounts) {
      dispatch(addBankAccount(getBankAccountsList?.bankAccounts));
    }
  }, [getBankAccountsList, dispatch]);

  const bankAccounts = useSelector((state: RootState) => state.bank.bankAccounts);

  const columns = React.useMemo(() => {
    return [
    //   {
    //     key: "id" as keyof AccountType,
    //     header: "ID",
    //   },
      {
        key: "bankName" as keyof AccountType,
        header: "Bank Name",
      },
      {
        key: "account_holder_name" as keyof AccountType,
        header: "Account Holder Name",
      },
      {
        key: "account_holder_type" as keyof AccountType,
        header: "Account Holder Type",
      },
      {
        key: "last4" as keyof AccountType,
        header: "Card",
      },
      {
        key: "country" as keyof AccountType,
        header: "Country",
      },
      {
        key: "currency" as keyof AccountType,
        header: "Currency",
      },
      {
        key: "status" as keyof AccountType,
        header: "Status",
      },
      {
        key: "actions" as keyof AccountType,
        header: "Actions",
        render: () => (
          <div className="flex space-x-2">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultValue="" className="sr-only peer" />
              <div className="relative w-6 h-4 bg-gray-200  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-2.5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            </label>
            <button className="text-gray-700 hover:text-blue-700">
              <Image
                width={16}
                height={16}
                src="/icons/edit.png"
                alt="Delete Icon"
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
          data={bankAccounts}
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
