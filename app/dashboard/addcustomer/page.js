"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useAddCustomerMutation } from "@/app/store/apis/customerApis";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CustomLoader from "@/app/loader/CustomLoader";

export default function AddTeamMember() {
  const [image, setImage] = useState(null);
  const [addCustomer, { isLoading }] = useAddCustomerMutation();
  const tags = useSelector((state) => state?.tag?.tags);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        name: `${data.firstName} ${data.lastName}`,
        // profileImage: image,
      };
      delete payload.firstName;
      delete payload.lastName;

      const response = await addCustomer(payload).unwrap();
      toast.success(response.msg || "Customer Added Successfully.");
      reset();
      router.push("/dashboard/customers");
    } catch (error) {
      console.error("Failed to add customer:", error);
      toast.error("Failed To Add Customer.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  return (
    <PrivateRoute>
      <div className="container mx-auto lg:p-4 p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col my-3">
            <label
              htmlFor="profileImage"
              className="py-3 text-gray-700 text-sm"
            >
              Profile
            </label>
            <div className="flex items-end">
              <div className="w-24 h-24 rounded-full border border-gray-300 bg-gray-200 overflow-hidden">
                <img
                  src={image || "/images/image.jpg"}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="px-6">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-600"
                >
                  <div className="p-2 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                    <img
                      src="/icons/export.png"
                      alt="Upload"
                      className="w-4 h-4"
                    />
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <div
                  onClick={handleImageDelete}
                  className="cursor-pointer p-2 rounded-full border border-gray-300 bg-white flex items-center justify-center"
                >
                  <img
                    src="/icons/delete.png"
                    alt="Delete"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-gray-700 text-sm">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First Name"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-gray-700 text-sm">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last Name"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="username" className="text-gray-700 text-sm">
                Username
              </label>
              <div className="flex items-center border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm">
                <input
                  id="username"
                  type="text"
                  {...register("userName", {
                    required: "Username is required",
                  })}
                  placeholder="Username"
                  className="w-full outline-none bg-white text-black text-sm"
                />
                <FaUser className="text-gray-600 ml-2" size={16} />
              </div>
              {errors.userName && (
                <p className="text-red-500 text-xs">
                  {errors.userName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Email"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-gray-700 text-sm">
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Phone"
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="tag" className="text-gray-700 text-sm">
                Tag
              </label>
              <select
                id="tag"
                {...register("tagId", { required: "Tag is required" })}
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select</option>
                {tags?.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.tagName}
                  </option>
                ))}
              </select>
              {errors.tagId && (
                <p className="text-red-500 text-xs">{errors.tagId.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="plan" className="text-gray-700 text-sm">
                Plan
              </label>
              <select
                id="plan"
                {...register("planId", { required: "Plan is required" })}
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select</option>
                <option value="681d8d3d56712d773a8cb3f6">Pro Plan</option>
              </select>
              {errors.planId && (
                <p className="text-red-500 text-xs">{errors.planId.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="w-36 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </button>

            {isLoading ? (
              <div className="w-36 flex justify-center items-center bg-blue-500 text-white rounded-md h-[42px]">
                <CustomLoader />{" "}
                {/* Replace this with your actual loader component */}
              </div>
            ) : (
              <button
                type="submit"
                className="w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}
