"use client"
import React, { useState } from 'react'
import Header from '../components/Header'

const page = () => {

    const Array = [
        {
            path: "General",
            label: "General Setting",
            Icon: (isActive) => (
                <svg  style={{ fill: isActive ? "white" : "#2E2E2E" }} width="16" height="16" viewBox="0 0 16 16"  xmlns="http://www.w3.org/2000/svg">
                    <path  d="M10.6674 14C12.1401 14 13.3872 12.7355 12.6811 11.443C12.4396 11.0009 12.1346 10.5914 11.7719 10.2288C10.7717 9.22857 9.4152 8.66667 8.00071 8.66667C6.58622 8.66667 5.22967 9.22857 4.22947 10.2288C3.86683 10.5914 3.5618 11.0009 3.32028 11.443C2.61423 12.7355 3.86128 14 5.33404 14H10.6674Z" />
                    <path d="M11.334 5.33333C11.334 7.17428 9.84166 8.66667 8.00071 8.66667C6.15976 8.66667 4.66737 7.17428 4.66737 5.33333C4.66737 3.49238 6.15976 2 8.00071 2C9.84166 2 11.334 3.49238 11.334 5.33333Z" />
                    <path d="M8.00071 8.66667C9.4152 8.66667 10.7717 9.22857 11.7719 10.2288C12.1346 10.5914 12.4396 11.0009 12.6811 11.443C13.3872 12.7355 12.1401 14 10.6674 14H5.33404C3.86128 14 2.61423 12.7355 3.32028 11.443C3.5618 11.0009 3.86683 10.5914 4.22947 10.2288C5.22967 9.22857 6.58622 8.66667 8.00071 8.66667ZM8.00071 8.66667C9.84166 8.66667 11.334 7.17428 11.334 5.33333C11.334 3.49238 9.84166 2 8.00071 2C6.15976 2 4.66737 3.49238 4.66737 5.33333C4.66737 7.17428 6.15976 8.66667 8.00071 8.66667Z" />
                </svg>
            )
        },
        {
            path: "Audit Logs",
            label: "Audit Logs",
            Icon: (isActive) => (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  style={{ fill: isActive ? "white" : "#2E2E2E" }} d="M4.66732 14H11.334C12.0704 14 12.6673 13.403 12.6673 12.6667V3.33333C12.6673 2.59695 12.0704 2 11.334 2H4.66732C3.93094 2 3.33398 2.59695 3.33398 3.33333V12.6667M4.66732 14C3.93094 14 3.33398 13.403 3.33398 12.6667M4.66732 14H6.00065M3.33398 12.6667C3.33398 11.9303 3.93094 11.3333 4.66732 11.3333H11.334C12.0704 11.3333 12.6673 10.7364 12.6673 10V9.33333M6.00065 4.66667H10.0007M6.66732 6.66667H9.33398" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            path: "Notisfications",
            label: "Notisfications",
            Icon: (isActive) => (
                <svg  width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path style={{ fill: isActive ? "white" : "#2E2E2E" }} d="M9.33398 12V12.6667C9.33398 13.403 8.73703 14 8.00065 14C7.26427 14 6.66732 13.403 6.66732 12.6667V12M8.00065 3.33333V2M8.00065 3.33333C9.8416 3.33333 11.334 4.82572 11.334 6.66667V10H11.6673C12.2196 10 12.6673 10.4477 12.6673 11C12.6673 11.5523 12.2196 12 11.6673 12H4.33398C3.7817 12 3.33398 11.5523 3.33398 11C3.33398 10.4477 3.7817 10 4.33398 10H4.66732V6.66667C4.66732 4.82572 6.1597 3.33333 8.00065 3.33333Z" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            path: "Payment Processors",
            label: "Payment Processors",
            Icon: (isActive) => (
                    <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path style={{ fill: isActive ? "white" : "#2E2E2E" }} d="M9.33398 12V12.6667C9.33398 13.403 8.73703 14 8.00065 14C7.26427 14 6.66732 13.403 6.66732 12.6667V12M8.00065 3.33333V2M8.00065 3.33333C9.8416 3.33333 11.334 4.82572 11.334 6.66667V10H11.6673C12.2196 10 12.6673 10.4477 12.6673 11C12.6673 11.5523 12.2196 12 11.6673 12H4.33398C3.7817 12 3.33398 11.5523 3.33398 11C3.33398 10.4477 3.7817 10 4.33398 10H4.66732V6.66667C4.66732 4.82572 6.1597 3.33333 8.00065 3.33333Z" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    )
        },
        {
            path: "Billing",
            label: "Billing",
            Icon: (isActive) => (
                <svg style={{ fill: isActive ? "white" : "#2E2E2E" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.33398 6.99992L1.33398 11.3333C1.33398 12.0696 1.93094 12.6666 2.66732 12.6666L13.334 12.6666C14.0704 12.6666 14.6673 12.0696 14.6673 11.3333V6.99992M1.33398 6.99992L1.33398 4.66659C1.33398 3.93021 1.93094 3.33325 2.66732 3.33325L13.334 3.33325C14.0704 3.33325 14.6673 3.93021 14.6673 4.66659L14.6673 6.99992M1.33398 6.99992H14.6673" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            path: "Customizations",
            label: "Customizations",
            Icon: (isActive) => (
                <svg style={{ fill: isActive ? "white" : "#2E2E2E" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9993 7.33329L13.0565 6.2761C13.5772 5.7554 13.5772 4.91119 13.0565 4.39049L11.6088 2.94277C11.0881 2.42207 10.2439 2.42207 9.72321 2.94277L8.66602 3.99996M11.9993 7.33329L5.99935 13.3333H2.66602V9.99996L8.66602 3.99996M11.9993 7.33329L8.66602 3.99996" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )
        },
        {
            path: "Integrations",
            label: "Integrations",
            Icon: (isActive) => (
                <svg style={{ fill: isActive ? "white" : "#2E2E2E" }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9993 7.33329L13.0565 6.2761C13.5772 5.7554 13.5772 4.91119 13.0565 4.39049L11.6088 2.94277C11.0881 2.42207 10.2439 2.42207 9.72321 2.94277L8.66602 3.99996M11.9993 7.33329L5.99935 13.3333H2.66602V9.99996L8.66602 3.99996M11.9993 7.33329L8.66602 3.99996" stroke="#2E2E2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            )
        }
    ]

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <Header
                title="Settings"
                description="Tailor your PRM system to match your business requirements and preferences."
            />
            <div className="p-6 flex   bg-transparent">
                <div className=' w-1/5 '>
                    <div className="flex  flex-wrap ">
                        <div className=" ">
                            <nav
                                className="flex flex-col space-y-2"
                                aria-label="Tabs"
                                role="tablist"
                                aria-orientation="horizontal"
                            >
                                {
                                    Array.map((item, index) => (
                                        <button
                                            type="button"
                                            className={` py-1.5 pl-4 pr-24 rounded-lg justify-center   inline-flex items-start gap-x-2 ${activeTab === item.path
                                                ? "bg-[#3366CC] text-white "
                                                : "border-transparent text-[#2E2E2E] "
                                                } text-sm whitespace-nowrap `}
                                            onClick={() => handleTabClick(`${item.path}`)}
                                        >
                                            {item.Icon(activeTab === item.path)}
                                            {item.label}
                                        </button>
                                    ))
                                }
                            </nav>
                        </div>

                    </div>
                </div>
                <div className="ms-3 w-4/5">
                    {activeTab === "tab1" && (
                        <div
                            id="vertical-tab-with-border-1"
                            role="tabpanel"
                            aria-labelledby="vertical-tab-with-border-item-1"
                        >
                            <p className="text-gray-500 dark:text-neutral-400">
                                This is the{" "}
                                <em className="font-semibold text-gray-800 dark:text-neutral-200">
                                    first
                                </em>{" "}
                                item's tab body.
                            </p>
                        </div>
                    )}
                    {activeTab === "tab2" && (
                        <div
                            id="vertical-tab-with-border-2"
                            role="tabpanel"
                            aria-labelledby="vertical-tab-with-border-item-2"
                        >
                            <p className="text-gray-500 dark:text-neutral-400">
                                This is the{" "}
                                <em className="font-semibold text-gray-800 dark:text-neutral-200">
                                    second
                                </em>{" "}
                                item's tab body.
                            </p>
                        </div>
                    )}
                    {activeTab === "tab3" && (
                        <div
                            id="vertical-tab-with-border-3"
                            role="tabpanel"
                            aria-labelledby="vertical-tab-with-border-item-3"
                        >
                            <p className="text-gray-500 dark:text-neutral-400">
                                This is the{" "}
                                <em className="font-semibold text-gray-800 dark:text-neutral-200">
                                    third
                                </em>{" "}
                                item's tab body.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default page;
