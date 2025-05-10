"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import { FaSearch, FaPlus } from "react-icons/fa";
import TagsTable from "./_components/TagsTable";
import FeatureModal from "../settings/FeatureModal";
import { useState } from "react";
import AddTagModal from "./_components/AddTagModal";

export default function TagsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <PrivateRoute>
      <AddTagModal isOpen={isOpen} closeModal={closeModal} />
      <div className="p-6 min-h-screen">
        <div className="flex items-center justify-between  pb-4">
          <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
            <FaSearch className="text-black mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none bg-white"
            />
            <img
              src="/icons/union.png"
              alt="Custom Icon"
              className="w-4 h-4 ml-2"
            />
          </div>

          <div className="flex space-x-4">
            <button
              className="flex text-sm items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setIsOpen(true)}
            >
              <FaPlus className="mr-2 text-sm" />
              Add New
            </button>
          </div>
        </div>

        <TagsTable />
      </div>
    </PrivateRoute>
  );
}
