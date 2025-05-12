// components/Loader.tsx

import React from "react";

const CustomLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="relative flex justify-center items-center mb-4">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default CustomLoader;
