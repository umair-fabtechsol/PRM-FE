"use client";
import React, { useState } from "react";
import AccountOnboardingModal from "./AccountOnboardingModal";
import AccountTable from "./_components/AccountTable";
import { toast } from "react-toastify";
import { useCreateClientSecretForPaymentMutation } from "@/app/store/apis/accountOnboardingApis";
import CustomLoader from "@/app/loader/CustomLoader";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

const AccountOnboarding = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [createClientSecretForPayment, { isLoading }] =
    useCreateClientSecretForPaymentMutation();

  const handleCreateClientSecret = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const stripeCustomerId = userData?.stripeCustomerId;

      if (!stripeCustomerId) {
        toast.error("Customer ID not found.");
        return;
      }

      const stripe = await stripePromise;

      if (!stripe) {
        toast.error("Stripe failed to initialize.");
        return;
      }

      const response = await createClientSecretForPayment({
        customerId: stripeCustomerId,
      }).unwrap();

      const { clientSecret } = response;

      const payment_method_data = {
        billing_details: {
          name: userData?.userName,
          email: userData?.email,
        },
      };

      const params = {
        payment_method_type: "us_bank_account",
        payment_method_data,
      };

      const result = await stripe.collectBankAccountForSetup({
        clientSecret,
        params,
      });

      if (result?.error) {
        toast.error(`Bank connection failed: ${result.error.message}`);
        return;
      }

      const confirmation = await stripe.confirmUsBankAccountSetup(clientSecret);

      if (confirmation.error) {
        toast.error(`Confirmation failed: ${confirmation.error.message}`);
        return;
      }

      toast.success("Client secret created successfully!", stripeCustomerId);
    } catch (error) {
      console.error("Error creating client secret:", error);
      toast.error("Failed to create client secret.");
    }
  };

  return (
    <>
      {isLoading && <CustomLoader />}
      <AccountOnboardingModal isOpen={isOpen} closeModal={closeModal} />
      <div className="bg-white min-h-screen rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between p-4 border-b-2 items-center">
          <h2 className="text-[#2E2E2E] text-sm font-Inter font-bold mb-6">
            Account Onboarding
          </h2>

          {/* Create Client Secret Button */}
          <button
            onClick={handleCreateClientSecret}
            className="bg-[#3366CC] flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#FFFFFF]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83398 10L14.1673 10M10.0007 14.1667L10.0007 5.83337"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Create Client Secret
          </button>

          {/* Add Bank Button */}
          <button
            onClick={openModal}
            className="bg-[#3366CC] flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#FFFFFF]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83398 10L14.1673 10M10.0007 14.1667L10.0007 5.83337"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Add New Bank
          </button>
        </div>

        <section className="container px-4 mx-auto">
          <div className="flex flex-col mt-6">
            <div className="overflow-x-auto sm:-mx-6">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 text-gray-700 md:rounded-lg">
                  <AccountTable />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end p-4 space-x-4 mb-4">
          <button className="bg-[#FFFFFF] border border-gray-300 rounded-lg py-2 px-12 text-[#2E2E2E] font-Inter font-semibold text-sm transition-all duration-300 hover:bg-gray-100 hover:border-gray-400">
            Cancel
          </button>
          <button className="bg-[#3366CC] py-2 px-12 rounded-lg text-[#FFFFFF] font-Inter font-semibold text-sm transition-all duration-300 hover:bg-[#254a99]">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountOnboarding;
