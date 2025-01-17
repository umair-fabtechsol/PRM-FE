"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CheckEmailPage() {
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
            Check Your Email
          </h2>

          <p className="mb-1 mt-4 text-gray-600 text-xs sm:text-sm ">
            We sent you a password reset link to
          </p>

          <p>
            <Link
              href="/login"
              className="ml-1 text-blue-500  text-sm  hover:underline"
            >
              thisisemailfortesting@gmail.com
            </Link>
          </p>

          <form>
            <button
              type="submit"
              className=" mt-6 mb-3 w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-300"
            >
              Open Email
            </button>
            <div className="flex justify-center items-center mt-5">
              <span className="text-gray-700 font-normal">
                Don't receive the email?
              </span>

              <Link
                href="/login"
                className=" ml-2 text-blue-500 font-semibold hover:underline"
              >
                Click to resend
              </Link>
            </div>

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
