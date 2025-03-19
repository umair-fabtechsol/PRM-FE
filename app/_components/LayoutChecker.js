// components/LayoutChecker.js

"use client"; // Mark as client-side component

import { usePathname } from "next/navigation";

const LayoutChecker = ({ children }) => {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/forgotpassword" ||
    pathname === "/checkemail" ||
    pathname === "/createpassword" ||
    pathname === "/passwordreset";

  return { isAuthPage, children };
};

export default LayoutChecker;
