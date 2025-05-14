"use client";

import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PrivateRoute from "@/app/_components/PrivateRoute";
import { useAddTeamMemberMutation } from "@/app/store/apis/teamApis";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function AddTeamMember() {
  const [image, setImage] = useState(null);
  const [addTeamMember, { isLoading }] = useAddTeamMemberMutation();
  const tags = useSelector((state) => state?.tag?.tags);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImage(null);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        // profileImage: image,
      };
      const response = await addTeamMember(payload).unwrap();
      toast.success(response.msg || "Partner Added Successfully.");
      reset();
      router.push("/dashboard/teammember");
      setImage(null);
    } catch (err) {
      console.error("Failed to add team member:", err);
      toast.error(err?.message || "Faild To Add Team Memebr");
    }
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
                <Image
                                 src={image || "/images/image.jpg"}
                                 alt="Profile"
                                 className="object-cover w-full h-full"
                                 width={150}
                                 height={150}
                               />
              </div>
              <div className="px-6">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-600"
                >
                  <div className="p-2 rounded-full border border-gray-300 bg-white flex items-center justify-center">
                    <Image
                                         src="/icons/export.png"
                                         alt="Upload"
                                         className="w-4 h-4"
                                         width={40}
                                         height={40}
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
                  <Image
                                     src="/icons/delete.png"
                                     alt="Delete"
                                     className="w-4 h-4"
                                     width={40}
                                     height={40}
                                   />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-gray-700 text-sm">
                Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                {...register("name", { required: "Name is required" })}
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
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
                  placeholder="Username"
                  {...register("userName", {
                    required: "Username is required",
                  })}
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

            <div className="flex flex-col">
              <label htmlFor="tag" className="text-gray-700 text-sm">
                Tag
              </label>
              <select
                id="tag"
                {...register("tag", { required: "Tag is required" })}
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              >
                <option value="">Select Tag</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.tagName}
                  </option>
                ))}
              </select>
              {errors.tag && (
                <p className="text-red-500 text-xs">{errors.tag.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
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
                placeholder="Phone"
                {...register("contact", { required: "Phone is required" })}
                className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs">{errors.contact.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="w-36 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}
