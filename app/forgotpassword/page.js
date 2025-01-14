"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  //this is for catch errors
  const forCatchErrors = () => {
    let isOk = true;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please Enter Email";
      isOk = false;
      toast.error("Please Enter Email");
    } else if (!isEmail(email)) {
      newErrors.email = "Invalid email";
      isOk = false;
      toast.error("Invalid email");
    }

    setErrors(newErrors);
    return isOk;
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/5">
          <h2 className="text-1xl sm:text-3xl text-black font-bold mb-2">
            Forgot Password?
          </h2>

          <p className=" mb-8 text-gray-600 text-xs sm:text-sm">
            Provide Your Credentials To Reset Your Password
          </p>

          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mt-2 text-black"
                placeholder="Enter your email"
                required
              />

              {errors.email && (
                <p className="text-red-500 text-[12px] pl-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              className=" mt-2 mb-3 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-300"
            >
              Next
            </button>

            <div className="flex justify-center items-center mt-5">
              <span className="text-gray-700 font-normal">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-gray-700  text-xs pe-3"
                />
                Back to
              </span>

              <Link
                href="/login"
                className="ml-1 text-blue-500 font-semibold hover:underline"
              >
                Login
              </Link>
            </div>
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
