"use client";

import PrivateRoute from "../../components/PrivateRoute";
import { FaArrowLeft, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

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

  return (
    <PrivateRoute>
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
              {currentStep === 4 && (
                <h1 className="text-black">Calender page</h1>
              )}
              {currentStep === 5 && (
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
