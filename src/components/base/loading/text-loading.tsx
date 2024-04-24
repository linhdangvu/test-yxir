import React from "react";

const TextLoading = () => {
  return (
    <div className="flex items-center justify-center w-56 h-56 rounded-lg  ">
      <div className="px-3 py-1 text-xs font-medium leading-none text-center text-gray-800 bg-gray-200 rounded-full animate-pulse dark:bg-black dark:text-gray-200">
        loading...
      </div>
    </div>
  );
};

export default TextLoading;
