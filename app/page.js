"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import Link from "next/link";

export default function Home() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  //this is making router
  const router = useRouter();

  //this is for getting data from hook
  const { setUser, active, setActive } = useAuth();

  //this is for show password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

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
    } else if (!password.trim()) {
      newErrors.password = "please Enter Password";
      isOk = false;
      toast.error("please Enter Password");
    }

    setErrors(newErrors);
    return isOk;
  };

  //this is for go to dashbord
  const forClickOnLoginButton = () => {
    localStorage.setItem("activetab", "Dashboard");
    setActive("Dashboard");
  };

  //this is for login
  const forLoginUser = async (e) => {
    e.preventDefault();
    if (forCatchErrors()) {
      const formData = {
        email,
        password,
      };

      console.log("ok data", formData);

      const url = `/api/users`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      try {
        const response = await fetch(url, options);
        console.log("response ", response);
        const data = await response.json();
        if (response.ok) {
          console.log("ok data", data);
          toast.success(data.msg);
          router.push("/dashboard");
          setUser(true);
        } else {
          console.log("err data", data);
          toast.error(data.msg);
        }
      } catch (err) {
        console.log("there is error in the add user function", err);
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/5">
          <h2 className="text-1xl sm:text-3xl text-black font-bold mb-2">
            Welcome Back 👋
          </h2>
          <p className=" mb-8 text-gray-600 text-xs sm:text-sm">
            Welcome Back! Please enter your details
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

            <div className="mb-4  ">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  className="w-full p-3 pr-10 border border-gray-300 rounded mt-2 text-black"
                  placeholder="Enter your password"
                  required
                />
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
            </div>

            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-xs text-gray-600">
                Remember for 7 days
              </label>
              <Link
                href="#"
                className="ml-auto text-xs text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <Link href="/dashboard">
              <button className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition-all ease-in-out duration-300">
                Login
              </button>
            </Link>
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
