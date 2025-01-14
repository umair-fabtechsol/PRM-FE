"use client";

import PrivateRoute from "../components/PrivateRoute";
import Header from "../components/Header";
import { FaAppStore, FaUser, FaArrowUp, FaDollarSign } from "react-icons/fa";

export default function ReportAndAnlyticsPage() {
  return (
    <PrivateRoute>
      <Header
        title="Report and analytics"
        description="track performance analyze trends and export detailed reports"
      />
      <div className="p-6 min-h-screen bg-transparent">
        <div className="mt-8 flex justify-end items-center space-x-2">
          <select className="text-sm pl-4 pr-8 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition focus:outline-none">
            <option value="7-days">7 days</option>
            <option value="10-days">10 days</option>
            <option value="15-days">15 days</option>
          </select>
          <button className="flex items-center text-sm px-4 py-2 bg-white text-gray-700 rounded border shadow hover:shadow-md transition">
            <img
              src="/icons/import.png"
              alt="Custom Icon"
              className="w-4 h-4 mr-2"
            />
            Export
          </button>
          <button className="px-4 mx-2 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            Generated report
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded flex items-center hover:bg-blue-600 hover:scale-105 transition-all duration-200">
            <img
              src="/icons/addwidget.svg"
              alt="Add Widget"
              className="mr-2"
              width={18}
              height={18}
            />
            Add Widget
          </button>
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
