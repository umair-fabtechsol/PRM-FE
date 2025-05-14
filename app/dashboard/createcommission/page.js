"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import { useAddCommissionMutation } from "@/app/store/apis/commissionApis";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateCommissionPage() {
  const [addCommission, { isLoading }] = useAddCommissionMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addCommission(data).unwrap();
      reset();
      toast.success(response?.message || "Commission Added Successfully");
      router.push("/dashboard/commissions");
    } catch (err) {
      console.error("Failed to create commission:", err);
      toast.error(err?.message || "Failed To Add Commission");
    }
  };

  return (
    <PrivateRoute>
      <div className="container mx-auto lg:p-4 p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Commission Name */}
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="text-sm text-gray-700">
              Commission Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter"
              {...register("commission_name", {
                required: "Commission name is required",
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm"
            />
            {errors.commission_name && (
              <p className="text-red-500 text-sm">
                {errors.commission_name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="text-sm text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Commission Type & Continuity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Commission Type</label>
              <select
                {...register("type", { required: "Select a type" })}
                className="border border-gray-300 px-4 py-2 rounded-md"
              >
                <option value="">Select</option>
                <option value="flat">Flat</option>
                <option value="percentage">Percentage</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>
          </div>

          {/* Tier Commissions */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {["firstTier", "secondTier", "referralCode"].map((field, i) => (
              <div key={field} className="flex flex-col">
                <label className="text-sm text-gray-700">
                  {i === 0 && "First Tier Commission"}
                  {i === 1 && "Second Tier Commission"}
                  {i === 2 && "Referral Percentage"}
                </label>
                <input
                  type="text"
                  placeholder={field}
                  {...register(field, { required: `${field} is required` })}
                  className="border border-gray-300 px-4 py-2 rounded-md"
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm">
                    {errors[field]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Payout Frequencies */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { id: "tierPayout", label: "First Tier Payout Frequency" },
              { id: "secondTierPayout", label: "Second Tier Payout Frequency" },
              { id: "referralPayout", label: "Referral Payout Frequency" },
            ].map(({ id, label }) => (
              <div key={id} className="flex flex-col">
                <label className="text-sm text-gray-700">{label}</label>
                <select
                  {...register(id, {
                    required: `Select ${label.toLowerCase()}`,
                  })}
                  className="border border-gray-300 px-4 py-2 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
                {errors[id] && (
                  <p className="text-red-500 text-sm">{errors[id]?.message}</p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Payment Processor</label>
              <select
                {...register("paymentProcessor", {
                  required: "Select payment processor",
                })}
                className="border border-gray-300 px-4 py-2 rounded-md"
              >
                <option value="" style={{ color: "black" }}>
                  Select
                </option>
                <option value="type1" style={{ color: "black" }}>
                  Type 1
                </option>
                <option value="type2" style={{ color: "black" }}>
                  Type 2
                </option>
                <option value="type3" style={{ color: "black" }}>
                  Type 3
                </option>
              </select>
              {errors.paymentProcessor && (
                <p className="text-red-500 text-sm">
                  {errors.paymentProcessor.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit/Cancel */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-36 px-6 py-2 bg-white border border-gray-300 rounded-md shadow-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </PrivateRoute>
  );
}
