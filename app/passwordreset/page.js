"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function PasswordResePage() {
  return (
    <div className="flex w-full h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/5">
          <h2 className="text-1xl sm:text-3xl text-black font-bold mb-2">
            Password reset
          </h2>

          <p className="mb-1 mt-4 text-gray-600 text-base sm:text-lg">
            Your password has been successfully reset. Click below to login
          </p>

          <form>
            <button
              type="submit"
              className=" mt-6 mb-3 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100">
        <Image
          src="/images/loginimg.png"
          alt="Login Illustration"
          width={500}
          height={500}
          className="w-full h-full object-fit"
        />
      </div>
    </div>
  );
}
