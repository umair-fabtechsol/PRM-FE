// "use client";

// import { useRouter } from "next/navigation";
// import Sidebar from "./components/Sidebar";

// export default function Home() {
//   const router = useRouter();
//   const goToLogin = () => {
//     router.push("/login");
//   };

//   const goToForgotPassword = () => {
//     router.push("/forgotpassword");
//   };
//   const goToCheckEmail = () => {
//     router.push("/checkemail");
//   };
//   const goToCreatePassword = () => {
//     router.push("/createpassword");
//   };
//   const goToPasswordReset = () => {
//     router.push("/passwordreset");
//   };

//   return (
//     // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//     //   <h1 className="text-2xl">This is for testing of next.js project</h1>
//     //   <button
//     //     onClick={goToLogin}
//     //     className="mt-4 p-2 bg-blue-500 text-white rounded"
//     //   >
//     //     Go to Login Page
//     //   </button>
//     //   <button
//     //     onClick={goToCreatePassword}
//     //     className="mt-4 p-2 bg-blue-500 text-white rounded"
//     //   >
//     //     Create Password
//     //   </button>
//     //   <button
//     //     onClick={goToForgotPassword}
//     //     className="mt-4 p-2 bg-blue-500 text-white rounded"
//     //   >
//     //     ForGot Password
//     //   </button>
//     //   <button
//     //     onClick={goToCheckEmail}
//     //     className="mt-4 p-2 bg-blue-500 text-white rounded"
//     //   >
//     //     Check Email
//     //   </button>
//     //   <button
//     //     onClick={goToPasswordReset}
//     //     className="mt-4 p-2 bg-blue-500 text-white rounded"
//     //   >
//     //     password reset
//     //   </button>
//     // </div>
//     <>
//       {/* <Sidebar /> */}

//       {/* <div className="text-white">riaz</div> */}
//     </>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
}
