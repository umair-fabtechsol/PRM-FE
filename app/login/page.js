"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import isEmail from "validator/lib/isEmail";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../store/apis/authApis";
import { useDispatch } from "react-redux";
import { addAdmin } from "../store/slices/authSlice";
import CustomLoader from "../loader/CustomLoader";

export default function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data) => {
    const { identifier, password } = data;

    if (!isEmail(identifier)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = await login({ identifier, password }).unwrap();
      dispatch(addAdmin(response?.data));
      toast.success(response.msg || "Login successful");
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.data?.msg || "Login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="flex w-full h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-3/5">
          <h2 className="text-1xl sm:text-3xl text-black font-bold mb-2">
            Welcome Back 👋
          </h2>
          <p className="mb-8 text-gray-600 text-xs sm:text-sm">
            Welcome Back! Please enter your details
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="identifier"
                type="identifier"
                className="w-full p-3 border border-gray-300 rounded mt-2 text-black"
                placeholder="Enter your email"
                {...register("identifier", { required: "Email is required" })}
              />
              {errors.identifier && (
                <p className="text-red-500 text-[12px] pl-1">
                  {errors.identifier.message}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded mt-2 text-black"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-[12px] pl-1">
                  {errors.password.message}
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

            <div className="mb-6 flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe" className="text-xs text-gray-600">
                Remember for 7 days
              </label>
              <a
                href="#"
                className="ml-auto text-xs text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full p-3 bg-blue-500 text-white rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? "cursor-not-allowed opacity-80"
                  : "hover:bg-blue-600"
              }`}
            >
              {isLoading && <CustomLoader />}
              <span>{isLoading ? "Logging in..." : "Login"}</span>
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
