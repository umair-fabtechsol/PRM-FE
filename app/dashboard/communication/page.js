"use client";

import PrivateRoute from "../../components/PrivateRoute";
import Header from "../../components/Header";
import { FaSearch } from "react-icons/fa";

const dummyUsers = [
  {
    name: "Ali Khan",
    image: "/user1.jpg",
    messages: [
      { text: "Hello!", sender: "Ali", time: "10:00 AM" },
      { text: "How are you?", sender: "You", time: "10:05 AM" },
    ],
  },
  {
    name: "Sara Ahmed",
    image: "/user2.jpg",
    messages: [
      { text: "Meeting at 3 PM?", sender: "Sara", time: "9:30 AM" },
      { text: "Sure, see you there!", sender: "You", time: "9:35 AM" },
    ],
  },
];

export default function CommunicationPage() {
  return (
    <PrivateRoute>
      <Header
        title="Communication"
        description="Manage and track all communication with your partners and team in one place"
      />
      <div className="flex h-screen">
        {/* Left Side - User List */}
        <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
          <div className="flex items-center p-4 bg-white border-b">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full p-2 border rounded-lg outline-none"
            />
          </div>
          {dummyUsers.map((user, index) => (
            <div key={index} className="flex items-center p-4 border-b">
              <img
                src="/images/image.jpg"
                alt={user.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold text-black">{user.name}</h3>
                <p className="text-sm text-gray-600">
                  {user.messages[user.messages.length - 1].text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Chat Area */}
        <div className="w-2/3 flex flex-col">
          {/* Header */}
          <div className="p-4 bg-white border-b flex items-center">
            <img
              src="/images/image.jpg"
              alt={dummyUsers[0].name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <h2 className="font-semibold text-black">{dummyUsers[0].name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
            {dummyUsers[0].messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.sender === "You" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
                <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-3 border rounded-lg outline-none"
            />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
