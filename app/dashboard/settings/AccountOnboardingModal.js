"use client";
import CustomLoader from "@/app/loader/CustomLoader";
import { useAddBankAccountMutation } from "@/app/store/apis/accountOnboardingApis";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AccountOnboardingModal = ({ isOpen, closeModal }) => {
  const [addBankAccount, { isLoading }] = useAddBankAccountMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addBankAccount(data).unwrap();
      toast.success(response?.msg || "Bank Account Added successfully.");
      reset();
      closeModal();
    } catch (error) {
      console.error("Error adding account:", error?.data);
      if (error?.data?.stripeCode === "bank_account_exists") {
        toast.error(error?.msg || "Bank Account Already Exist.");
      } else if (error?.data?.stripeCode === "account_number_invalid") {
        toast.error(error?.msg || "Invalid Account Number.");
      } else {
        toast.error(error?.data?.message || "Failed To Add Bank");
      }
    }
  };

  return (
    <>
      <div>
        {isOpen && (
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="fixed top-0 left-0 w-full overflow-y-auto h-full z-[80] bg-black bg-opacity-50 flex justify-center items-center"
            role="dialog"
            aria-labelledby="hs-small-modal-label"
          >
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto text-gray-700">
              <div className="flex justify-between items-center py-3 px-4">
                <h3
                  id="hs-small-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  New Account Onboarding
                </h3>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 max-h-[80vh] overflow-y-auto"
              >
                {isLoading && <CustomLoader />}

                {/* Account Holder Name */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="accountHolderName"
                  >
                    Account Holder Name
                  </label>
                  <input
                    id="accountHolderName"
                    type="text"
                    {...register("accountHolderName", {
                      required: "Account holder name is required",
                    })}
                    placeholder="Enter account holder name"
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  />
                  {errors.accountHolderName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accountHolderName.message}
                    </p>
                  )}
                </div>

                {/* Account Type */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="accountType"
                  >
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    {...register("accountType", {
                      required: "Account type is required",
                    })}
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  >
                    <option value="">Select type</option>
                    <option value="individual">Individual</option>
                  </select>
                  {errors.accountType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accountType.message}
                    </p>
                  )}
                </div>

                {/* Routing Number */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="routingNumber"
                  >
                    Routing Number
                  </label>
                  <input
                    id="routingNumber"
                    type="text"
                    {...register("routingNumber", {
                      required: "Routing number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Routing number must contain only digits",
                      },
                    })}
                    placeholder="Enter routing number"
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  />
                  {errors.routingNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.routingNumber.message}
                    </p>
                  )}
                </div>

                {/* Account Number */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="accountNumber"
                  >
                    Account Number
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    {...register("accountNumber", {
                      required: "Account number is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Account number must contain only digits",
                      },
                    })}
                    placeholder="Enter account number"
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  />
                  {errors.accountNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.accountNumber.message}
                    </p>
                  )}
                </div>

                {/* Currency */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="currency"
                  >
                    Currency
                  </label>
                  <select
                    id="currency"
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  >
                    <option value="">Select currency</option>
                    <option value="USD">USD</option>
                  </select>
                  {errors.currency && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.currency.message}
                    </p>
                  )}
                </div>

                {/* Country */}
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    {...register("country", {
                      required: "Country is required",
                    })}
                    placeholder="Enter country code (e.g., US)"
                    className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  />
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex w-full justify-end items-center gap-x-2 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      closeModal();
                    }}
                    className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountOnboardingModal;
