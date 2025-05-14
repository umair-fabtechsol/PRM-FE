"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import { useAddPartnerMutation } from "@/app/store/apis/partnerApis";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DashboardPage() {
  const [addPartner, { isLoading }] = useAddPartnerMutation();
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
      const response = await addPartner(data).unwrap();
      toast.success(response.msg || "Partner Added Successfully.");
      reset();
      router.push("/dashboard/partners");
    } catch (error) {
      console.error("Failed to add partner:", error);
    }
  };

  return (
    <PrivateRoute>
      <div className="container mx-auto lg:p-4 p-2">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-700 text-sm">
              First Name
            </label>
            <input
              id="firstName"
              {...register("name", { required: "First name is required" })}
              placeholder="First Name"
              className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="userName" className="text-gray-700 text-sm">
              Username
            </label>
            <div className="flex items-center border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm">
              <input
                id="userName"
                {...register("userName", { required: "Username is required" })}
                placeholder="Username"
                className="w-full outline-none bg-white text-black text-sm"
              />
              <FaUser className="text-gray-600 ml-2" size={20} />
            </div>
            {errors.userName && (
              <span className="text-red-500 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="tag" className="text-gray-700 text-sm">
              Select Tag
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
              <span className="text-red-500 text-sm">{errors.tag.message}</span>
            )}
          </div>

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
                  message: "Invalid email format",
                },
              })}
              placeholder="Email"
              className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-700 text-sm">
              Phone
            </label>
            <input
              id="phone"
              {...register("phone", {
                required: "Phone is required",
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits",
                },
              })}
              placeholder="Phone"
              className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="sm:col-span-2 flex justify-end space-x-4 my-6">
            <button
              type="button"
              className="w-36 px-6 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-md hover:shadow-lg hover:bg-gray-100 transition"
              onClick={() => reset()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}
