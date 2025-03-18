"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaArrowLeft, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

//new code

import TaskModal from "../calender/TaskModal";
import BroadcastModal from "../calender/BroadcastModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [siteLink, setSiteLink] = useState('https://fabtechsol.com');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      setImages((prev) => [...prev, file]);

      // Simulate the upload process
      let progress = 0;
      const progressInterval = setInterval(() => {
        if (progress < 100) {
          progress += 10;
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        } else {
          clearInterval(progressInterval);
          // Simulate upload completion
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: 100,
          }));
        }
      }, 500); // Simulate every 500ms increment
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const steps = [
    "General Info",
    "Goals",
    "Assets",
    "Text",
    "Configure",
    "Calendar",
    "Review",
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const users = [
    { id: 1, name: "User 1", image: "https://via.placeholder.com/50" },
    { id: 2, name: "User 2", image: "https://via.placeholder.com/50" },
    { id: 3, name: "User 3", image: "https://via.placeholder.com/50" },
    { id: 4, name: "User 4", image: "https://via.placeholder.com/50" },
    { id: 5, name: "User 5", image: "https://via.placeholder.com/50" },
    { id: 6, name: "User 6", image: "https://via.placeholder.com/50" },
    { id: 7, name: "User 7", image: "https://via.placeholder.com/50" },
  ];

  const maxVisible = 5;
  const visibleUsers = users.slice(0, maxVisible);
  const remainingUsersCount = users.length - maxVisible;

  //new code
  const [isOpenTaskModal, setIsOpenTaskModal] = useState(false);
  const [isOpenBroadcastModal, setIsOpenBroadcastModal] = useState(false);
  const [view, setView] = useState("timeGridWeek");
  const calendarRef = useRef(null);
  const [TaskModalData, setTaskModalData] = useState({});
  const [events, setEvents] = useState([]);

  console.log(TaskModalData);

  useEffect(() => {
    const newEvent = {
      title: TaskModalData.taskName || "Default Task",
      start: TaskModalData.startTime,
      end: TaskModalData.endTime,
      color: TaskModalData.color,
      description: TaskModalData.description,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
  }, [TaskModalData]);

  const openModal = () => setIsOpenTaskModal(true);
  const closeModal = () => setIsOpenTaskModal(false);

  const openBroadCastModal = () => setIsOpenBroadcastModal(true);
  const closeBroadcastModal = () => setIsOpenBroadcastModal(false);

  const handleViewChange = (newView) => {
    setView(newView);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(newView);
    }
  };

  return (
    <PrivateRoute>
      {/* new code */}
      <TaskModal
        setTaskModalData={setTaskModalData}
        isOpen={isOpenTaskModal}
        closeModal={closeModal}
      />
      <BroadcastModal
        isOpen={isOpenBroadcastModal}
        closeModal={closeBroadcastModal}
      />

      {/* my code */}
      <div className="p-6 min-h-screen flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <div className="h-2 bg-gray-300 rounded-full relative">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: `${((currentStep + 1) * 100) / steps.length}%`,
                }}
              />
              <div
                className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full border-r-2 border-blue-500"
                style={{
                  left: `${((currentStep + 1) * 100) / steps.length}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            <div className="flex justify-around px-3 mt-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center text-sm ${
                    index <= currentStep ? "text-blue-500 " : "text-gray-500"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-6">
            <div className="mt-4">
              {currentStep === 0 && (
                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="input1" className="text-gray-700 text-sm">
                        name
                      </label>
                      <input
                        id="input1"
                        type="text"
                        placeholder="Compaign name"
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="description"
                      className="text-gray-700 text-sm"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      placeholder="Description"
                      className="w-full outline-none bg-white border border-gray-300 px-4 py-4 rounded-md shadow-sm text-black text-sm"
                      rows="6"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="startDate"
                        className="text-gray-700 text-sm"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="endDate"
                        className="text-gray-700 text-sm"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      />
                    </div>
                  </div>
                </form>
              )}
              {currentStep === 1 && (
                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="input1" className="text-gray-700 text-sm">
                        Budget
                      </label>
                      <input
                        id="input1"
                        type="text"
                        placeholder="Enter budget here...."
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 my-3 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="input1" className="text-gray-700 text-sm">
                        Revenue Target
                      </label>
                      <input
                        id="input1"
                        type="text"
                        placeholder="revenue target here...."
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <label
                      htmlFor="description"
                      className="text-gray-700 text-sm"
                    >
                      Notes
                    </label>
                    <textarea
                      id="description"
                      placeholder="write here...."
                      className="w-full outline-none bg-white border border-gray-300 px-4 py-4 rounded-md shadow-sm text-black text-sm"
                      rows="6"
                    />
                  </div>
                </form>
              )}
              {currentStep === 2 && (
                <form>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white flex flex-col items-center justify-center">
                    <FaCloudUploadAlt className="text-3xl text-gray-400 mb-4" />
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileUpload"
                    />
                    <label
                      htmlFor="fileUpload"
                      className="text-blue-500 cursor-pointer"
                    >
                      Click here to upload or drop files here
                    </label>
                  </div>

                  <div className="mt-8 space-y-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow w-full sm:w-1/2"
                      >
                        <div className="flex items-center w-full">
                          <img
                            alt={`Uploaded ${index}`}
                            className="w-10 h-10 mr-4"
                            src={URL.createObjectURL(image)}
                          />
                          <div className="w-full">
                            <p
                              className={`text-sm inline ${
                                uploadProgress[image.name] === 100
                                  ? "text-black"
                                  : "text-gray-500"
                              }`}
                            >
                              {image.name}
                            </p>
                            <Link
                              className={`text-blue-500 text-xs ml-2 inline ${
                                uploadProgress[image.name] === 100
                                  ? "block"
                                  : "hidden"
                              }`}
                              href="#"
                            >
                              Preview
                            </Link>
                            {/* Progress Bar inside the file item div */}
                            {uploadProgress[image.name] < 100 && (
                              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 max-w-xs">
                                <div
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  style={{
                                    width: `${uploadProgress[image.name]}%`,
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-gray-500 text-xs ml-auto">
                          {(image.size / 1024 / 1024).toFixed(2)} MB
                        </div>

                        <button
                          className="text-gray-400 hover:text-gray-600 ml-4"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </form>
              )}
              {currentStep === 3 && (
                <form>
                  <div className=" rounded-lg flex md:flex-row flex-col gap-4">
                    <div className=" md:w-3/5 w-full">
                      {/* Site Link Input */}
                      <h3 className="text-lg font-semibold text-black">
                        Site Link
                      </h3>
                      <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
                        <input
                          type="text"
                          value={siteLink}
                          onChange={(e) => setSiteLink(e.target.value)}
                          className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                        />
                        <button className="bg-[#3366CC] text-white px-4 py-2 rounded-md hover:bg-blue-600">
                          Preview
                        </button>
                      </div>

                      {/* Website Preview */}
                      <div className="border rounded-lg overflow-hidden">
                        <iframe
                          src={siteLink}
                          className="w-full h-72 sm:h-96 border-none"
                          title="Website Preview"
                        ></iframe>
                      </div>
                    </div>
                    {/* Review & Share */}
                    <div className="md:w-2/5 w-full">
                      <div className="p-4 border border-gray-300 rounded-lg bg-white ">
                        <h3 className="text-lg font-semibold text-black">
                          Review & Share
                        </h3>
                        <p className="text-sm text-black">
                          Edit any fields below or re-select a different element
                          on the left and then hit save.{" "}
                        </p>

                        <div className="mt-4">
                          <label className="block text-black">
                            Target Element Selector
                          </label>
                          <input
                            type="text"
                            value={siteLink}
                            className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                            readOnly
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-black">
                            Conversation Rate
                          </label>
                          <input
                            type="text"
                            placeholder="$"
                            className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                          />
                        </div>

                        <button className="mt-4 w-full bg-[#3366CC] text-white py-2 rounded-md hover:bg-blue-600">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              {currentStep === 4 && (
                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-2 my-3 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="tag" className="text-gray-700 text-sm">
                        Team member
                      </label>
                      <select
                        id="tag"
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      >
                        <option value="">Select Team members</option>
                        <option value="tag1">Tag 1</option>
                        <option value="tag2">Tag 2</option>
                        <option value="tag3">Tag 3</option>
                        <option value="tag4">Tag 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 my-3 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="tag" className="text-gray-700 text-sm">
                        Partner
                      </label>
                      <select
                        id="tag"
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      >
                        <option value="">Select Partners</option>
                        <option value="tag1">Tag 1</option>
                        <option value="tag2">Tag 2</option>
                        <option value="tag3">Tag 3</option>
                        <option value="tag4">Tag 4</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 my-3 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label htmlFor="input1" className="text-gray-700 text-sm">
                        Commision Plan
                      </label>
                      <input
                        id="input1"
                        type="text"
                        placeholder="Enter Commision...."
                        className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="w-1/2 my-2 rounded-md bg-transparent">
                      <p className="text-gray-700 text-sm mb-2">
                        Overriding settings
                      </p>{" "}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col w-full">
                          <label
                            htmlFor="select1"
                            className="text-gray-700 text-sm"
                          >
                            Tag/ Partner
                          </label>
                          <select
                            id="select1"
                            className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                          >
                            <option value="">Select</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </select>
                        </div>

                        <div className="flex flex-col w-full">
                          <label
                            htmlFor="input1"
                            className="text-gray-700 text-sm"
                          >
                            Commision plan
                          </label>
                          <input
                            id="input1"
                            type="text"
                            placeholder="Commision"
                            className="w-full outline-none bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-black text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              {currentStep === 5 && (
                <div className="py-4 lg:px-6 px-3  min-h-screen bg-transparent">
                  <div className="flex justify-between">
                    <div className="relative flex rounded-lg border">
                      <input
                        type="text"
                        id="search-input"
                        name="search-input"
                        className="py-2 px-16 pl-11 w-full border border-gray-200 shadow-sm rounded-lg text-sm"
                        placeholder="Search..."
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center  pr-4">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.8333 15.8333C10.8333 16.7538 11.5795 17.5 12.5 17.5C13.4205 17.5 14.1667 16.7538 14.1667 15.8333M10.8333 15.8333C10.8333 14.9129 11.5795 14.1667 12.5 14.1667C13.4205 14.1667 14.1667 14.9129 14.1667 15.8333M10.8333 15.8333H2.5M14.1667 15.8333H17.5M10.8333 4.16667C10.8333 5.08714 11.5795 5.83333 12.5 5.83333C13.4205 5.83333 14.1667 5.08714 14.1667 4.16667M10.8333 4.16667C10.8333 3.24619 11.5795 2.5 12.5 2.5C13.4205 2.5 14.1667 3.24619 14.1667 4.16667M10.8333 4.16667L2.5 4.16667M14.1667 4.16667H17.5M9.16667 10C9.16667 10.9205 8.42047 11.6667 7.5 11.6667C6.57953 11.6667 5.83333 10.9205 5.83333 10M9.16667 10C9.16667 9.07953 8.42047 8.33333 7.5 8.33333C6.57953 8.33333 5.83333 9.07953 5.83333 10M9.16667 10L17.5 10M5.83333 10H2.5"
                            stroke="#4A4A4A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                        <svg
                          className="h-4 w-4 text-black dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <select
                        onChange={(e) => handleViewChange(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-none"
                        value={view}
                      >
                        <option value="timeGridWeek">Weekly</option>
                        <option value="timeGridDay">Day</option>
                      </select>
                      <button
                        onClick={openBroadCastModal}
                        className="bg-white border flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#000]"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3327 7.5C14.966 7.5 16.4577 8.99238 16.4577 10.8333V13.6468C16.4577 14.2966 16.6476 14.9323 17.0042 15.4756L18.3327 17.5H9.99935C8.1584 17.5 6.66602 16.0076 6.66602 14.1667V12.5M13.3327 7.5V5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5H6.87435C5.0334 2.5 3.54102 3.99238 3.54102 5.83333V8.64677C3.54102 9.29663 3.35106 9.93232 2.99451 10.4756L1.66602 12.5H9.99935C11.8403 12.5 13.3327 11.0076 13.3327 9.16667V7.5Z"
                            stroke="#2E2E2E"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Create Broadcast
                      </button>
                      <button
                        onClick={openModal}
                        className="bg-[#3366CC] flex gap-3 justify-center items-center px-4 py-2 rounded-lg font-Inter font-semibold text-sm text-[#FFFFFF]"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.83398 10L14.1673 10M10.0007 14.1667L10.0007 5.83337"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Create Task
                      </button>
                    </div>
                  </div>
                  {/* Calendar */}
                  <div className="my-6">
                    <FullCalendar
                      dayHeaderContent={(arg) => (
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "start",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#71717A",
                              fontFamily: "Inter",
                              fontSize: "12px",
                            }}
                          >
                            {arg.date.toLocaleString("default", {
                              weekday: "short",
                            })}
                          </span>
                          <span className="font-Inter font-medium text-black text-xl">
                            {arg.date.getDate()}
                          </span>
                        </span>
                      )}
                      ref={calendarRef}
                      initialView={view}
                      plugins={[dayGridPlugin, timeGridPlugin]}
                      dayCellClassNames={(arg) => {
                        const today = new Date();
                        if (today.toDateString() === arg.date.toDateString()) {
                          return "custom-today-highlight";
                        }
                        return "";
                      }}
                      allDaySlot={false}
                      editable={true}
                      selectable={true}
                      headerToolbar={false}
                      events={events}
                      eventContent={(arg) => {
                        const startTime = new Date(
                          arg.event.start
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        return (
                          <div
                            className="flex flex-col justify-between h-full"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              height: "100%",
                              overflow: "hidden",
                              borderLeft: `4px solid #fff`, // Fix border alignment
                              padding: "4px", // Inner padding
                              boxSizing: "border-box", // Includes padding in the element size
                            }}
                          >
                            <div style={{ fontSize: "12px", color: "#555" }}>
                              {startTime}
                            </div>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                                color: "#000",
                              }}
                            >
                              {arg.event.title}
                            </div>
                          </div>
                        );
                      }}
                      slotMinTime="07:00:00"
                      slotMaxTime="31:00:00"
                    />
                  </div>
                </div>
              )}
              {currentStep === 6 && (
                <div className="px-2 bg-transparent">
                  <div className="py-2   my-2">
                    <p className="text-black py-2  text-sm">Name</p>
                    <p className="text-gray-700 text-xs">John Doe</p>
                  </div>

                  <div className="py-2   my-2">
                    <p className="text-black py-2  text-sm">Description</p>
                    <p className="text-gray-700 text-xs">
                      {" "}
                      This is a dummy description text. It should be around 50
                      to 60 words in length. You can replace it with your actual
                      data as needed. This is a dummy description text. It
                      should be around 50 to 60 words in length. You can replace
                      it with your actual data as needed. should be around 50 to
                      60 words in length. You can replace it with your actual
                      data as needed.
                    </p>
                  </div>

                  <div className="py-2 flex   font-sm mb-4">
                    <div className="w-1/2 pr-2">
                      <p className="text-black py-2  text-sm">Start Date</p>
                      <p className="text-gray-700 text-xs">December 31, 2024</p>
                    </div>
                    <div className="w-1/2 pl-2">
                      <p className="text-black py-2  text-sm">End Date</p>
                      <p className="text-gray-700 text-xs">December 31, 2024</p>
                    </div>
                  </div>

                  <div className="py-2   my-2">
                    <p className="text-black py-2  text-sm">Budget</p>
                    <p className="text-gray-700 text-xs">$20,000</p>
                  </div>

                  <div className="py-2   my-2">
                    <p className="text-black py-2  text-sm">Revenue Target</p>
                    <p className="text-gray-700 text-xs">$20,000</p>
                  </div>

                  <div className="py-2   my-2">
                    <p className="text-black py-2  text-sm">Note</p>
                    <p className="text-gray-700 text-xs">
                      {" "}
                      This is a note text. It contains approximately 30 words
                      and can be replaced with actual information as required.
                      This is a note text. It contains approximately 30 words
                      and can be replaced with actual information as required.
                    </p>
                  </div>

                  <div className="py-2   font-sm mb-4">
                    <p className="text-black py-2  text-sm">Assests</p>
                    <div className="flex space-x-1">
                      <img
                        src="/images/image.jpg"
                        alt="Asset"
                        className="w-16 h-16"
                      />
                      <img
                        src="/images/image.jpg"
                        alt="Asset"
                        className="w-16 h-16"
                      />{" "}
                      <img
                        src="/images/image.jpg"
                        alt="Asset"
                        className="w-16 h-16"
                      />{" "}
                      <img
                        src="/images/image.jpg"
                        alt="Asset"
                        className="w-16 h-16"
                      />
                    </div>
                  </div>

                  <div className="py-2 font-sm mb-4">
                    <p className="text-black py-2 text-sm ">Team Members</p>
                    <div className="flex -space-x-2">
                      {visibleUsers.map((user) => (
                        <img
                          key={user.id}
                          src="/images/image.jpg"
                          alt={user.name}
                          className="w-7 h-7 rounded-full border-2 border-white"
                        />
                      ))}
                      {remainingUsersCount > 0 && (
                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-green-500">
                          +{remainingUsersCount}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="py-2 font-sm mb-4">
                    <p className="text-black py-2 text-sm ">Partner</p>
                    <div className="flex -space-x-2">
                      {visibleUsers.map((user) => (
                        <img
                          key={user.id}
                          src="/images/image.jpg"
                          alt={user.name}
                          className="w-7 h-7 rounded-full border-2 border-white"
                        />
                      ))}
                      {remainingUsersCount > 0 && (
                        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-xs font-semibold text-green-500">
                          +{remainingUsersCount}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="py-2   my-2">
                    <p className="text-black py-2  text-sm">Commission Plan</p>
                    <p className="text-gray-700 text-xs">
                      Select a Commission plan
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons at the bottom */}
        <div className="flex justify-end space-x-4 mb-4">
          {currentStep !== 0 && (
            <button
              onClick={handleBack}
              className="w-[150px] py-2 text-base bg-white text-black border border-gray-300 rounded-lg flex items-center justify-center space-x-2 shadow-md hover:bg-gray-200 hover:shadow-lg transition-all disabled:opacity-50"
              disabled={currentStep === 0}
            >
              <FaArrowLeft size={14} className="text-sm mr-2" />
              <span>Back</span>
            </button>
          )}

          <button
            onClick={handleNext}
            className="w-[150px] py-2 text-sm bg-blue-500 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            <span>{currentStep === steps.length - 1 ? "Create" : "Next"}</span>
          </button>
        </div>
      </div>
    </PrivateRoute>
  );
}
