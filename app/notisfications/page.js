import React from 'react'
import Header from '../components/Header';

const page = () => {
    const notifications = [
        { id: 1, text: "Campaign 'Holiday Sale' reached 10,000 impressions.", date: "Nov 13, 2024 4:34 am", unread: true },
        { id: 2, text: "Campaign 'Holiday Sale' reached 10,000 impressions.", date: "Nov 14, 2024 1:17 pm", unread: true },
        { id: 3, text: "Affiliate John Doe generated $500 in revenue this week.", date: "Nov 29, 2024 7:45 pm", unread: false },
        { id: 4, text: "Review pending affiliate applications.", date: "Nov 18, 2024 5:35 pm", unread: false },
    ];
    return (
        <>
            <Header
                title="Notifications"
                description="Stay updated with system alerts, updates, and tasks."
            />
            <div className="max-w-full mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-[#3366CC] text-white rounded-lg">All</button>
                        <button className="px-4 py-2 bg-white text-black ">Broadcast</button>
                        <button className="px-4 py-2 bg-white text-black ">Campaign Alert</button>
                        <button className="px-4 py-2 bg-white text-black ">Messages Alert</button>
                    </div>
                    <button className="text-gray-500">Clear All</button>
                </div>
                <div classN1ame="space-y-4">
                    {notifications.map(notification => (
                        <div key={notification.id} className="flex justify-between items-start border-b-2 p-4 ">
                            <div className="flex items-start space-x-2">
                                {notification.unread && <span className="bg-[#3366CC] w-3 h-3 rounded-full mt-1"></span>}
                                <div>
                                    <p>{notification.text}</p>
                                    <p className="text-gray-500 text-sm">{notification.date}</p>
                                </div>
                            </div>
                            <button className="text-gray-500"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3L13 13" stroke="#4A4A4A" strokeWidth="1.5" />
                                <path d="M13 3L3 13" stroke="#4A4A4A" strokeWidth="1.5" />
                            </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default page