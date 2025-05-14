"use client";

import PrivateRoute from "@/app/_components/PrivateRoute";
import { FaPaperPlane, FaSearch, FaEllipsisH } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

export default function CommunicationPage() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const dummyUsers = [
    {
      id: 1,
      name: "Ali Khan",
      image: "/user1.jpg",
      messages: [
        {
          text: "Hello! How are you doing today?",
          sender: "Ali",
          time: "10:00 AM",
        },
        {
          text: "I'm good, thanks for asking. What about you?",
          sender: "You",
          time: "10:05 AM",
        },
        {
          text: "I'm fine as well. Just busy with some work.",
          sender: "Ali",
          time: "10:10 AM",
        },
        {
          text: "Same here. Let's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later's catch up later.Same here. Let's catch up later.",
          sender: "You",
          time: "10:15 AM",
        },
      ],
    },
    {
      id: 2,
      name: "Sara Ahmed",
      image: "/user2.jpg",
      messages: [
        {
          text: "Hey, are we still on for the meeting at 3 PM?",
          sender: "Sara",
          time: "9:30 AM",
        },
        {
          text: "Yes, definitely. I’ll see you there.",
          sender: "You",
          time: "9:35 AM",
        },
        {
          text: "Great! Don’t forget to bring the presentation.",
          sender: "Sara",
          time: "9:40 AM",
        },
        {
          text: "Sure thing. I’ll also bring the updated report.",
          sender: "You",
          time: "9:45 AM",
        },
        {
          text: "Hey, are we still on for the meeting at 3 PM?",
          sender: "Sara",
          time: "9:30 AM",
        },
        {
          text: "Yes, definitely. I’ll see you there.",
          sender: "You",
          time: "9:35 AM",
        },
        {
          text: "Great! Don’t forget to bring the presentation.",
          sender: "Sara",
          time: "9:40 AM",
        },
        {
          text: "Sure thing. I’ll also bring the updated report.",
          sender: "You",
          time: "9:45 AM",
        },
        {
          text: "Hey, are we still on for the meeting at 3 PM?",
          sender: "Sara",
          time: "9:30 AM",
        },
        {
          text: "Yes, definitely. I’ll see you there.",
          sender: "You",
          time: "9:35 AM",
        },
        {
          text: "Great! Don’t forget to bring the presentation.",
          sender: "Sara",
          time: "9:40 AM",
        },
        {
          text: "Sure thing. I’ll also bring the updated report.",
          sender: "You",
          time: "9:45 AM",
        },
      ],
    },
    {
      id: 3,
      name: "Ahmed Raza",
      image: "/user3.jpg",
      messages: [
        {
          text: "Good morning! Any updates on the project?",
          sender: "Ahmed",
          time: "8:00 AM",
        },
        {
          text: "Good morning! Yes, the project is on track and we are meeting the deadlines.",
          sender: "You",
          time: "8:05 AM",
        },
        {
          text: "That’s great to hear. Let me know if you need any assistance.",
          sender: "Ahmed",
          time: "8:10 AM",
        },
        {
          text: "Will do. Thanks for checking in!",
          sender: "You",
          time: "8:15 AM",
        },
      ],
    },
    {
      id: 4,
      name: "Maria Khan",
      image: "/user4.jpg",
      messages: [
        {
          text: "Hi! Did you get a chance to look at the new design mockups?",
          sender: "Maria",
          time: "11:00 AM",
        },
        {
          text: "Yes, I did. They look fantastic. Great job!",
          sender: "You",
          time: "11:05 AM",
        },
        {
          text: "Thanks! Do you have any suggestions for improvement?",
          sender: "Maria",
          time: "11:10 AM",
        },
        {
          text: "Not at the moment. I think it’s pretty solid as is.",
          sender: "You",
          time: "11:15 AM",
        },
      ],
    },
    {
      id: 5,
      name: "Usman Ali",
      image: "/user5.jpg",
      messages: [
        {
          text: "Can you share the document we discussed last week?",
          sender: "Usman",
          time: "2:00 PM",
        },
        {
          text: "Sure, I’ll email it to you right away.",
          sender: "You",
          time: "2:05 PM",
        },
        {
          text: "Thanks! By the way, have you decided on the venue for the event?",
          sender: "Usman",
          time: "2:10 PM",
        },
        {
          text: "Not yet. I’m still considering a few options.",
          sender: "You",
          time: "2:15 PM",
        },
      ],
    },
    {
      id: 6,
      name: "Zainab Iqbal",
      image: "/user6.jpg",
      messages: [
        {
          text: "Hello! Are you free to discuss the marketing plan?",
          sender: "Zainab",
          time: "1:00 PM",
        },
        {
          text: "Hi! Yes, I’m free. Let’s discuss now.",
          sender: "You",
          time: "1:05 PM",
        },
        {
          text: "Perfect. I think we should focus more on social media platforms this time.",
          sender: "Zainab",
          time: "1:10 PM",
        },
        {
          text: "That’s a good idea. Let’s draft a plan around that.",
          sender: "You",
          time: "1:15 PM",
        },
      ],
    },
  ];

  const selectedUser = dummyUsers.find((user) => user.id === selectedUserId);

  return (
    <PrivateRoute>
      <div className="flex py-1 lg:px-6 px-3  h-screen">
        <div
          className="w-1/3 bg-gray-100 border-r overflow-y-auto"
          style={{
            scrollbarWidth: "none",
            WebkitScrollbar: "none",
          }}
        >
          <h1 className="text-black px-2 pt-2  font-bold">Messages</h1>
          <div className="py-2">
            <div className="relative bg-transparent border-b rounded-lg">
              <input
                type="text"
                placeholder="search here...."
                className="w-full p-2 pl-10 pr-10 border rounded-lg outline-none"
              />
              <FaSearch className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {dummyUsers.map((user, index) => (
            <div
              key={index}
              className={`cursor-pointer flex items-center p-4 border-b ${
                selectedUserId === user.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-black"
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <Image
                src="/images/image.jpg"
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
                width={40}
                height={40}
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  className={`text-sm ${
                    selectedUserId === user.id ? "text-white" : "text-gray-600"
                  }`}
                >
                  {user.messages[user.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-2/3 flex flex-col">
          <div className="p-4 bg-white border-b flex items-center justify-between">
            {selectedUser ? (
              <>
                <div className="flex items-center">
                  <Image
                    src="/images/image.jpg"
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full mr-4"
                    width={40}
                    height={40}
                  />
                  <div>
                    <h2 className="font-semibold text-black">
                      {selectedUser.name}
                    </h2>
                    <p className="text-sm text-gray-500">founder</p>
                  </div>
                </div>

                <div className="cursor-pointer">
                  <FaEllipsisH className="text-gray-500 text-sm" />
                </div>
              </>
            ) : (
              <p className="text-gray-500">Select a user to view details</p>
            )}
          </div>

          {/* Messages */}
          <div
            className="flex-grow overflow-y-auto p-4 bg-white"
            style={{
              scrollbarWidth: "none",
              WebkitScrollbar: "none",
            }}
          >
            {selectedUser ? (
              selectedUser.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="w-3/5">
                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender === "You"
                          ? "bg-blue-500 text-sm text-white"
                          : "bg-gray-100 text-sm text-black"
                      } text-left`}
                    >
                      {msg.text}
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-2 ${
                        msg.sender === "You" ? "text-right" : "text-left"
                      }`}
                    >
                      Nov 22, 2024 10:34 PM
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                Select a user to view messages
              </p>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-transparent flex items-center">
            <input
              type="text"
              placeholder="What would you like to say..."
              className="w-full text-gray-700 px-4 py-2 text-sm bg-gray-200 rounded-lg outline-none mr-2"
            />
            <div className="bg-blue-500 p-2 rounded-full cursor-pointer flex items-center justify-center">
              <FaPaperPlane className="text-white text-lg" />{" "}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
