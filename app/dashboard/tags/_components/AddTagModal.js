"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddTagMutation } from "@/app/store/apis/tagApis";
import CustomLoader from "@/app/loader/CustomLoader";
import Image from "next/image";

const AddTagModal = ({ isOpen, closeModal }) => {
  const [addTag, { isLoading }] = useAddTagMutation();
  const [color, setColor] = useState("#2563eb");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    const tagType = [];
    if (data.forPartner) tagType.push("partner");
    if (data.forTeam) tagType.push("teamMember");

    if (tagType.length === 0) {
      toast.error("Select at least one tag type.");
      return;
    }

    try {
      const tagPayload = {
        tagName: data.tagName,
        description: data.description,
        tagColor: color,
        tagType,
      };

      const response = await addTag(tagPayload).unwrap();
      toast.success(response?.msg || "Tag Added Successfully.");
      reset();
      closeModal();
    } catch (error) {
      toast.error(error?.msg || "Failed To Add Tag.");
    }
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
          <div className="my-4">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="4"
                y="4"
                width="48"
                height="48"
                rx="24"
                fill="#3366CC"
                fillOpacity="0.1"
              />
              <rect
                x="4"
                y="4"
                width="48"
                height="48"
                rx="24"
                stroke="#FAFAFA"
                strokeWidth="8"
              />

              {/* Wrap the 20x20 icon in a <g> and translate it to center */}
              <g transform="translate(18, 18)">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7269 6.25526L17.0535 9.39819C17.6488 9.9607 17.6488 10.8727 17.0535 11.4352L13.7269 14.5782C13.441 14.8483 13.0532 15 12.6488 15H4.02457C3.18257 15 2.5 14.3552 2.5 13.5596V7.27378C2.5 6.47827 3.18257 5.83337 4.02457 5.83337H12.6488C13.0532 5.83337 13.441 5.98513 13.7269 6.25526Z"
                    fill="#3366CC"
                    fillOpacity="0.3"
                    stroke="#3366CC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </g>
            </svg>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Tags Management
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isLoading && <CustomLoader />}

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Select
              </label>
              <div className="flex items-center gap-5">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    {...register("forPartner")}
                    className="form-checkbox rounded text-blue-600"
                  />
                  For Partner
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 ml-auto mr-28">
                  <input
                    type="checkbox"
                    {...register("forTeam")}
                    className="form-checkbox rounded text-blue-600"
                  />
                  For Team
                </label>
              </div>
              {!watch("forPartner") && !watch("forTeam") && (
                <p className="text-red-500 text-xs">
                  Select at least one tag type.
                </p>
              )}
            </div>

            {/* Tag Name */}
            <div className="flex gap-4">
              {/* Tag Name - 80% */}
              <div className="basis-4/5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tag Name
                </label>
                <input
                  type="text"
                  {...register("tagName", { required: "Tag name is required" })}
                  placeholder="New Partner"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.tagName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.tagName.message}
                  </p>
                )}
              </div>

              {/* Color Picker - 20% */}
              <div className="basis-1/5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <div className="flex items-center gap-2">
                  {/* Color Circle (clickable) */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        document.getElementById("colorPickerInput")?.click();
                      }}
                      className="w-[40px] h-[40px] rounded-full border shadow-sm"
                      style={{ backgroundColor: color }}
                      title="Pick Color"
                    />

                    {/* Hidden input stays here for triggering */}
                    <input
                      id="colorPickerInput"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="absolute top-5 left-0 opacity-0 w-[40px] h-[40px] cursor-pointer"
                      style={{ zIndex: 100 }}
                    />
                  </div>

                  <input
                    id="colorPickerInput"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="hidden"
                  />

                  <div className="w-[40px] h-[40px] rounded-full border shadow-sm flex items-center justify-center overflow-hidden">
                    <Image
                      src="/icons/pencil-icon.png"
                      alt="Edit"
                      className="w-5 h-5 object-contain"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discription
              </label>
              <textarea
                {...register("description", {
                  maxLength: {
                    value: 200,
                    message: "Description is too long (max 200 characters)",
                  },
                })}
                placeholder="Tag for recently onboarded partners."
                className="w-full px-3 py-2 border rounded-md shadow-sm resize-none focus:outline-none focus:ring focus:ring-blue-500 h-[150px]"
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4 gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/2 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-1/2 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddTagModal;
