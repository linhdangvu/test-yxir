import React, { useState } from "react";

interface Setting {
  title: string;
  val: number;
}

const DatasetSetting = (props: any) => {
  const [val, setVal] = useState(props.val);
  const [title, setTitle] = useState(props.title);

  const handleRangeChange = (event: any) => {
    const nVal = parseInt(event.target.value);
    setVal(nVal);
  };

  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <div>
        <div className="flex justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <div className="bg-blue-200 text-black py-1 px-2 border-2 border-black rounded-md font-semibold text-lg">
            {val}
          </div>
        </div>
        <input
          type="range"
          value={val}
          onChange={handleRangeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        ></input>
      </div>
    </div>
  );
};

export default DatasetSetting;
