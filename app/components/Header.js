"use client";
import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Header = ({ title, description }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    router.push("/dashboard/notisfications");
  };

  return (
    <header className="w-full bg-transparent py-4 lg:px-6 px-3 flex justify-between items-center">
      <div className="text-left flex flex-col justify-center">
        <h2 className="text-1xl lg:text-2xl font-semibold text-black mb-2 capitalize">
          {title}
        </h2>
        <p className="text-xs md:text-sm  lg:text-base text-gray-700">
          {description}
        </p>
      </div>

      <div className="flex space-x-4">
        <button className="bg-white p-2.5 rounded-md">
          <FaSearch className="text-black" size={16} />
        </button>

        <button
          onClick={handleButtonClick}
          className={`${
            pathname === "/dashboard/notisfications"
              ? "bg-blue-500"
              : "bg-white"
          }   p-2.5 rounded-md relative`}
        >
          <FaBell
            className={`${
              pathname === "/dashboard/notisfications"
                ? "text-white"
                : "text-black"
            }`}
            size={16}
          />
          <span
            className={`${
              pathname === "/dashboard/notisfications"
                ? "bg-black "
                : "bg-blue-500"
            }   absolute top-[-4px] right-[-4px]  w-4 h-4 rounded-full flex items-center justify-center text-white text-xs`}
          >
            1
          </span>
        </button>

        <button className="p-0 rounded-full">
          <Image
            src="/images/image.jpg"
            alt="User"
            width={40}
            height={40}
            className="rounded-full object-fit"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
