"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CreatePasswordPage() {
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passVisibleNew, setPassVisibleNew] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //this is for show password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //this is for show new password
  const forNewPassVisibility = () => {
    setPassVisibleNew(!passVisibleNew);
  };

  //this is for catch errors
  const forCatchErrors = () => {
    let isOk = true;
    const newErrors = {};

    if (!password.trim()) {
      newErrors.password = "Please Enter Password";
      isOk = false;
      toast.error("Please Enter Password");
    } else if (password !== newPassword) {
      newErrors.newPassword = "password s do not match";
      isOk = false;
      toast.error("password s do not match");
    }

    setErrors(newErrors);
    return isOk;
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/5">
          <h2 className="text-1xl sm:text-3xl text-black font-bold mb-2">
            Create Password
          </h2>

          <p className=" mb-8 text-gray-600 text-xs sm:text-sm">
            Update your password to regain secoure access to your account
          </p>

          <form>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded mt-2 text-black"
                placeholder="Enter your password"
                required
              />{" "}
              {errors.password && (
                <p className="text-red-500 text-[12px] pl-1">
                  {errors.password}
                </p>
              )}
              <span
                onClick={togglePasswordVisibility}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${
                  passwordVisible ? "text-blue-500" : ""
                }`}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </span>
            </div>

            <div className="mb-4 mt-2 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Re-enter New Password
              </label>
              <input
                type={passVisibleNew ? "text" : "password"}
                onChange={(e) => setNewPassword(e.target.value)}
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded mt-2 text-black"
                placeholder="Enter your password"
                required
              />{" "}
              {errors.password && (
                <p className="text-red-500 text-[12px] pl-1">
                  {errors.password}
                </p>
              )}
              <span
                onClick={forNewPassVisibility}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 ${
                  passVisibleNew ? "text-blue-500" : ""
                }`}
              >
                {passVisibleNew ? "🙈" : "👁️"}
              </span>
            </div>

            <button
              type="submit"
              className=" mt-2 mb-3 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-300"
            >
              Create
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
