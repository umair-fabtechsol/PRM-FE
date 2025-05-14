"use client";

import { useState } from "react";
import PrivateRoute from "@/app/_components/PrivateRoute";
import { FaAppStore, FaUser, FaArrowUp, FaDollarSign } from "react-icons/fa";
import RoleBased from "@/app/common/RoleBased";
import { ROLES } from "@/app/constants/roles.constant";
import Image from "next/image";

export default function ReportAndAnlyticsPage() {
  const [widgetModal, setWidgetMoal] = useState(false);

  return (
    <PrivateRoute>
      {widgetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[400px]   rounded-lg p-6 shadow-lg relative">
            <div className="flex justify-left my-2 text-red-500">
              <Image
                src="/icons/addwidgets.png"
                alt="Add Widget"
                className="mr-2"
                width={40}
                height={40}
              />
            </div>

            <h2 className="text-left p-2 text-lg font-semibold text-black">
              Custome Widget
            </h2>

            <div className="my-4">
              <label
                htmlFor="widget-type"
                className="block text-sm  text-gray-700 mb-1"
              >
                {"who see's generated widget"}
              </label>
              <select
                id="widget-type"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="type1">Custome widget</option>
                <option value="type2">Smart widget</option>
              </select>

              <label
                htmlFor="widget-name"
                className="block text-sm  text-gray-700 mt-2 mb-1"
              >
                Widget Name
              </label>
              <input
                id="widget-name"
                type="text"
                placeholder="Enter widget name"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label
                htmlFor="widget-description"
                className="block text-sm  text-gray-700 mt-4 mb-1"
              >
                Enter Widget Code
              </label>
              <textarea
                id="widget-description"
                rows="5"
                placeholder="Enter widget description"
                className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black resize-none overflow-y-auto"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between gap-4">
              <button
                onClick={() => setWidgetMoal(false)}
                className="w-full py-2 text-black border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => setWidgetMoal(false)}
                className="w-full py-2 text-white bg-blue-700 rounded-lg shadow-sm hover:bg-blue-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 min-h-screen bg-transparent">
        <div className="mt-8 flex justify-end items-center space-x-2">
          <select className="text-sm pl-4 pr-8 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition focus:outline-none">
            <option value="7-days">7 days</option>
            <option value="10-days">10 days</option>
            <option value="15-days">15 days</option>
          </select>
          <button className="flex items-center text-sm px-4 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
            <Image
              src="/icons/import.png"
              alt="Custom Icon"
              className="w-4 h-4 mr-2"
              width={18}
              height={18}
            />
            Export
          </button>
          <button className="px-4 mx-2 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Generated report
          </button>
          <RoleBased allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN]}>
            <button
              onClick={() => setWidgetMoal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-all duration-200"
            >
              <Image
                src="/icons/addwidget.svg"
                alt="Add Widget"
                className="mr-2"
                width={18}
                height={18}
              />
              Add Widget
            </button>
          </RoleBased>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Total Revenue
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $50,000
              </h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              <FaArrowUp className="mr-1 text-green-500 " size={16} />
              <span className="text-green-500 pr-3">40%</span> vs Last Month
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Active affiliates
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">250</h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              affiliate contributing
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  top campaign
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">
                $50,000 <span className="text-xs text-gray-600 ">Revenue</span>
              </h1>{" "}
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              Black friday promo
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center">
                <p className="text-sm text-black font-bold mr-2">
                  Converstion rate
                </p>
              </div>
              <h1 className="text-2xl text-black font-semibold my-3">5.5%</h1>
            </div>
            <div className="mt-2 text-sm text-gray-700  flex items-center">
              Average CTR
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
