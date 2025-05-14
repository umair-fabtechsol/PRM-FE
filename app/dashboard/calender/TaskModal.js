"use client";
import CustomLoader from "@/app/loader/CustomLoader";
import { useCreateTaskMutation } from "@/app/store/apis/calendarApis";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const TaskModal = ({ isOpen, closeModal, setTaskModalData }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const onSubmit = async (data) => {
    try {
      console.log("===========>data :", data);

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const startTime = `${year}-${month}-${day}T${data.startTime}:00.000Z`;
      const endTime = `${year}-${month}-${day}T${data.endTime}:00.000Z`;

      console.log(startTime, endTime);

      const taskData = { ...data, startTime, endTime };

      setTaskModalData(taskData);

      // const response = await createTask(taskData).unwrap();

      // toast.success(response?.message || "Task Created Successfully.");

      reset();

      closeModal();
    } catch (error) {
      console.log("Error while creating task", error?.message);
      toast.error(error?.message || "Failed To Create Task.");
    }
  };

  return (
    <div>
      {isLoading && <CustomLoader />}
      {isOpen && (
        <div
          id="hs-small-modal"
          className="fixed  top-0 left-0 w-full   h-full z-[80] bg-black bg-opacity-50 flex justify-center items-center"
          role="dialog"
          aria-labelledby="hs-small-modal-label"
          style={{ overflowX: "hidden" }}
        >
          <form
            style={{ overflowX: "hidden" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div
              style={{ overflowX: "hidden" }}
              className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto "
            >
              <div className="flex gap-y-4 flex-col  py-3 px-4  ">
                <div className="">
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
                    <path
                      d="M23 21.3333H34.6667L30.5 25.5L34.6667 29.6667H23V21.3333Z"
                      fill="#3366CC"
                      fillOpacity="0.3"
                    />
                    <path
                      d="M23 20.5V35.5M23 21.3333H34.6667L30.5 25.5L34.6667 29.6667H23V21.3333Z"
                      stroke="#3366CC"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3
                  id="hs-small-modal-label"
                  className="font-bold text-gray-800 "
                >
                  Task
                </h3>
              </div>
              <div
                className="p-4 text-[#2E2E2E] font-Inter font-medium  max-h-[60vh] overflow-y-auto"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700">Task Name</label>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        {...register("taskName", {
                          required: "Task name is required",
                        })}
                        type="text"
                        className="flex-grow border rounded-md p-2"
                        placeholder="New Task"
                      />
                      {errors.taskName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.taskName.message}
                        </p>
                      )}
                    </div>

                    <div className="ml-2 flex items-center">
                      <div className="relative w-10 h-10">
                        <label
                          className="block w-full h-full rounded-full cursor-pointer"
                          style={{
                            backgroundColor: watch("color") || "#3366CC",
                          }}
                        >
                          <input
                            type="color"
                            {...register("color", {
                              required: "Color is required",
                            })}
                            defaultValue="#3366CC"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </label>
                      </div>
                      <button className="ml-2 text-gray-500 ">
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_dd_497_4476)">
                            <rect
                              x="4"
                              y="2"
                              width="40"
                              height="40"
                              rx="20"
                              fill="white"
                            />
                            <rect
                              x="4.5"
                              y="2.5"
                              width="39"
                              height="39"
                              rx="19.5"
                              stroke="#CCCCCC"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M32.4778 13.1774C32.1993 12.8988 31.8685 12.6778 31.5045 12.527C31.1405 12.3762 30.7504 12.2986 30.3563 12.2986C29.9623 12.2986 29.5722 12.3762 29.2082 12.527C28.8442 12.6778 28.5134 12.8988 28.2348 13.1774L26.7018 14.7104C26.1433 14.442 25.5152 14.3537 24.9043 14.4578C24.2934 14.5618 23.7299 14.8532 23.2918 15.2914L22.5788 16.0054C22.393 16.1912 22.2456 16.4117 22.1451 16.6544C22.0445 16.8971 21.9928 17.1572 21.9928 17.4199C21.9928 17.6827 22.0445 17.9428 22.1451 18.1855C22.2456 18.4282 22.393 18.6487 22.5788 18.8344L16.0928 25.3194C15.8143 25.5982 15.5934 25.929 15.4428 26.2931C15.2921 26.6572 15.2147 27.0474 15.2148 27.4414V29.2414C15.2148 29.5597 15.3413 29.8649 15.5663 30.09C15.7914 30.315 16.0966 30.4414 16.4148 30.4414H18.2148C19.0102 30.4407 19.7728 30.1242 20.3348 29.5614L26.8208 23.0774C27.0066 23.2632 27.2271 23.4106 27.4698 23.5112C27.7125 23.6118 27.9726 23.6635 28.2353 23.6635C28.4981 23.6635 28.7582 23.6118 29.0009 23.5112C29.2436 23.4106 29.4641 23.2632 29.6498 23.0774L30.3638 22.3624C30.8021 21.9243 31.0934 21.3609 31.1975 20.75C31.3016 20.1391 31.2133 19.511 30.9448 18.9524L32.4778 17.4204C32.7565 17.1419 32.9775 16.8111 33.1283 16.4471C33.2791 16.0831 33.3567 15.693 33.3567 15.2989C33.3567 14.9049 33.2791 14.5148 33.1283 14.1508C32.9775 13.7868 32.7565 13.456 32.4778 13.1774ZM17.5078 26.7344L23.9928 20.2484L25.4068 21.6624L18.9218 28.1484C18.7344 28.336 18.48 28.4414 18.2148 28.4414H17.2148V27.4414C17.2149 27.1762 17.3203 26.9219 17.5078 26.7344Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_dd_497_4476"
                              x="0"
                              y="0"
                              width="48"
                              height="48"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="2" />
                              <feGaussianBlur stdDeviation="2" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.06 0"
                              />
                              <feBlend
                                mode="multiply"
                                in2="BackgroundImageFix"
                                result="effect1_dropShadow_497_4476"
                              />
                              <feColorMatrix
                                in="SourceAlpha"
                                type="matrix"
                                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                result="hardAlpha"
                              />
                              <feOffset dy="2" />
                              <feGaussianBlur stdDeviation="1" />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0 0.180392 0 0 0 0.06 0"
                              />
                              <feBlend
                                mode="multiply"
                                in2="effect1_dropShadow_497_4476"
                                result="effect2_dropShadow_497_4476"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect2_dropShadow_497_4476"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Select Campaign</label>
                  <select
                    {...register("campaign", {
                      required: "Campaign selection is required",
                    })}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select</option>
                    <option value="campaign1">Campaign 1</option>
                    <option value="campaign2">Campaign 2</option>
                  </select>
                  {errors.campaign && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.campaign.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center ">
                    <div className="flex justify-between space-x-1 w-full">
                      <div className="flex w-1/2 flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                          <input
                            {...register("startTime", {
                              required: "Start time is required",
                            })}
                            type="time"
                            className="text-gray-700 w-full focus:outline-none"
                          />
                        </div>
                        {errors.startTime && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.startTime.message}
                          </p>
                        )}
                      </div>

                      <div className="flex w-1/2 flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                          <input
                            {...register("endTime", {
                              required: "End time is required",
                            })}
                            type="time"
                            className="text-gray-700 w-full focus:outline-none"
                          />
                        </div>
                        {errors.endTime && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.endTime.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4 space-y-4">
                  <label className="block text-gray-700">Select</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="individual"
                      name="select"
                      className="mr-2"
                      checked
                      onChange={() => {}}
                    />
                    <label htmlFor="individual" className="mr-4 ">
                      Individual
                    </label>
                    <input
                      type="checkbox"
                      id="tag"
                      name="select"
                      className="mr-2"
                    />
                    <label htmlFor="tag">Tag</label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Member</label>
                  <select
                    {...register("member", {
                      required: "Member is required",
                    })}
                    className="w-full border rounded-md p-2"
                  >
                    <option value="">Select a member</option>
                    <option value="Cyrusophioto">Cyrusophioto</option>
                    <option value="Jacob">Jacob</option>
                    <option value="Ali">Ali</option>
                    <option value="Abdullah">Abdullah</option>
                  </select>
                  {errors.member && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.member.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                      maxLength: {
                        value: 200,
                        message: "Description cannot exceed 200 characters",
                      },
                    })}
                    className="w-full border rounded-md p-2"
                    rows="4"
                    placeholder="Tag for recently onboarded partners."
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-full justify-end items-center gap-x-2 py-3 px-4  dark:border-neutral-700">
                <button
                  onClick={closeModal}
                  className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 hover:border-gray-500 hover:shadow-md transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 w-1/2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskModal;
