"use client";
import CustomLoader from "@/app/loader/CustomLoader";
import { useAddTagMutation } from "@/app/store/apis/tagApis";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddTagModal = ({ isOpen, closeModal }) => {
  const [addTag, { isLoading }] = useAddTagMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await addTag(data).unwrap();
      toast.success(response?.msg || "Tag Added Successfully.");
      reset();
      closeModal();
    } catch (error) {
      console.error("Error adding Tag:", error);
      toast.error(error?.msg || "Failed To Add Tag.");
    }
  };

  return (
    <>
      <div>
        {isOpen && (
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            id="hs-small-modal"
            className="fixed top-0 left-0 w-full overflow-y-auto h-full z-[80] bg-black bg-opacity-50 flex justify-center items-center"
            role="dialog"
            aria-labelledby="hs-small-modal-label"
          >
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto text-gray-700">
              <div className="flex justify-between items-center py-3 px-4">
                <h3
                  id="hs-small-modal-label"
                  className="font-bold text-gray-800 dark:text-white"
                >
                  Add New Tag
                </h3>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 max-h-[80vh] overflow-y-auto"
              >
                {isLoading && <CustomLoader />}
                <div className="mb-4">
                  <label
                    className="block text-[#2E2E2E] font-Inter text-sm font-bold mb-2"
                    htmlFor="tag-name"
                  >
                    Tag Name
                  </label>
                  <input
                    id="tag-name"
                    type="text"
                    placeholder="Enter Tag Name"
                    {...register("tagName", {
                      required: "Tag name is required",
                    })}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {errors.tagName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.tagName.message}
                    </p>
                  )}
                </div>

                <div className="flex w-full justify-end items-center gap-x-2 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                      closeModal();
                    }}
                    className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-500 hover:shadow-md transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddTagModal;
