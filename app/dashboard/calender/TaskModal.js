"use client";
import React from "react";
import { useForm } from "react-hook-form";

const TaskModal = ({ isOpen, closeModal, setTaskModalData }) => {
  const { register, handleSubmit, watch, reset } = useForm();

  const onSubmit = (data) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Construct startTime and endTime in UTC
    const startTime = `${year}-${month}-${day}T${data.startTime}:00.000Z`;
    const endTime = `${year}-${month}-${day}T${data.endTime}:00.000Z`;

    console.log(startTime, endTime);

    setTaskModalData({ ...data, startTime, endTime });

    reset();
    closeModal();
  };

  return (
    <div>
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
                    <input
                      {...register("taskName", { required: true })}
                      type="text"
                      className="flex-grow border rounded-md p-2"
                      placeholder="New Task"
                    />
                    <div className="ml-2 flex items-center">
                      <div className="w-10 h-10 rounded-full p-0 border-none cursor-pointer bg-blue-600"></div>
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
                              fill-rule="evenodd"
                              clip-rule="evenodd"
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
                              color-interpolation-filters="sRGB"
                            >
                              <feFlood
                                flood-opacity="0"
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
                    {...register("campaign")}
                    className="w-full border rounded-md p-2"
                  >
                    <option>Select</option>
                  </select>
                </div>
                <div className="mb-4  ">
                  <div className="flex justify-between items-center ">
                    <div className="flex justify-between space-x-1 w-full">
                      <div className="flex w-1/2  flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Start Time
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                          <input
                            {...register("startTime", { required: true })}
                            placeholder="New Task"
                            type="time"
                            className="text-gray-700 w-full focus:outline-none"
                          />
                          {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.5 4H7C4.79086 4 3 5.79086 3 8M7.5 4V2M7.5 4H16.5M16.5 4H17C19.2091 4 21 5.79086 21 8M16.5 4V2M3 8V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V8M3 8H21" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg> */}
                        </div>
                      </div>
                      <div className="flex w-1/2  flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          End Time
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                          <input
                            {...register("endTime", { required: true })}
                            placeholder="End Time"
                            type="time"
                            className="text-gray-700 w-full focus:outline-none"
                          />
                          {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.5 4H7C4.79086 4 3 5.79086 3 8M7.5 4V2M7.5 4H16.5M16.5 4H17C19.2091 4 21 5.79086 21 8M16.5 4V2M3 8V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V8M3 8H21" stroke="#4A4A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg> */}
                        </div>
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
                  <select className="w-full border rounded-md p-2">
                    <option>Cyrusophioto</option>
                    <option>Jacob</option>
                    <option>Ali</option>
                    <option>Abdullah</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    {...register("description")}
                    className="w-full border rounded-md p-2"
                    rows="4"
                    placeholder="Tag for recently onboarded partners."
                  ></textarea>
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
