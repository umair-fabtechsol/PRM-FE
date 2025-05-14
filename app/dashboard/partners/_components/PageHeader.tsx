import React from "react";
import Image from "next/image.js";
import { FaSearch } from "react-icons/fa";

export default function PageHeader() {
  return (
    <div className="flex items-center border border-gray-300 rounded px-2 py-1 w-full max-w-sm bg-white">
      <FaSearch className="text-black mr-2" />
      <input
        type="text"
        placeholder="Search"
        className="flex-1 outline-none bg-white"
      />
      <Image
        src="/icons/union.png"
        alt="Custom Icon"
        className="w-4 h-4 ml-2"
        width={60}
        height={60}
      />
    </div>
  );
}
