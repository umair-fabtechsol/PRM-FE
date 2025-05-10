"use client";
import React, { useEffect, useRef, useState } from "react";
import TaskModal from "./TaskModal";
import BroadcastModal from "./BroadcastModal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Page = () => {
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
    <>
      <TaskModal
        setTaskModalData={setTaskModalData}
        isOpen={isOpenTaskModal}
        closeModal={closeModal}
      />
      <BroadcastModal
        isOpen={isOpenBroadcastModal}
        closeModal={closeBroadcastModal}
      />

      <div className="p-6 min-h-screen bg-transparent">
        <div className="flex justify-between">
          <div className="relative flex rounded-lg border">
            <input
              type="text"
              id="search-input"
              name="search-input"
              className="py-2 px-16 pl-11 w-full border border-gray-200 text-black shadow-sm rounded-lg text-sm"
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
                  strokeLinejoin="round"
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
              className="p-3 border text-black rounded-lg focus:outline-none"
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
                  strokeLinejoin="round"
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
                  strokeLinejoin="round"
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
                  {arg.date.toLocaleString("default", { weekday: "short" })}
                </span>
                <span className="font-Inter font-medium text-[#000000] text-xl">
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
              const startTime = new Date(arg.event.start).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              );
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
    </>
  );
};

export default Page;
