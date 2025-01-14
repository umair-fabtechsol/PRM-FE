"use client";

import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import { FaArrowLeft, FaUser, FaUpload, FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function CreateCommissionPage() {
  return (
    <PrivateRoute>
      <Header
        title={
          <span className="flex items-center text-gray-700">
            <FaArrowLeft className="mr-2 text-gray-700 capitalize" size={20} />{" "}
            Commission management
          </span>
        }
        description="Manage and customize commission structures for accurate partner payouts"
      />
      <div className="container mx-auto p-4">
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="input1" className="text-gray-700 text-sm">
                commission name
              </label>
              <input
                id="input1"
                type="text"
                placeholder="Enter"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="description" className="text-gray-700 text-sm">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              className="w-full  outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="commissionType" className="text-gray-700 text-sm">
                Commission Type
              </label>
              <select
                id="commissionType"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select Type</option>
                <option value="type1">Type 1</option>
                <option value="type2">Type 2</option>
                <option value="type3">Type 3</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="commissionContinuity"
                className="text-gray-700 text-sm"
              >
                Commission Continuity
              </label>
              <select
                id="commissionContinuity"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select Continuity</option>
                <option value="continuity1">Continuity 1</option>
                <option value="continuity2">Continuity 2</option>
                <option value="continuity3">Continuity 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="firstTier" className="text-gray-700 text-sm">
                First Tier Commission
              </label>
              <input
                id="firstTier"
                type="text"
                placeholder="First Tier"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="secondTier" className="text-gray-700 text-sm">
                Second Tier Commission
              </label>
              <input
                id="secondTier"
                type="text"
                placeholder="Second Tier"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="referralCode" className="text-gray-700 text-sm">
                Referral Code
              </label>
              <input
                id="referralCode"
                type="text"
                placeholder="Referral Code"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="tierPayout" className="text-gray-700 text-sm">
                First Tier Payout Frequency
              </label>
              <select
                id="tierPayout"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="secondTierPayout"
                className="text-gray-700 text-sm"
              >
                Second Tier Payout Frequency
              </label>
              <select
                id="secondTierPayout"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="referralPayout" className="text-gray-700 text-sm">
                Referral Payout Frequency
              </label>
              <select
                id="referralPayout"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select Frequency</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>

          <div></div>

          <div className="sm:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="w-36 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}
