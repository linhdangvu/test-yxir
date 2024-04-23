import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Dropdown = (props: any) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownContent = [
    "Graphique de surveillance", // 0
    "Graphique KPI", // 1
    "Tableau", // 2
    "Carte", // 3
  ];

  const handleDropdown = (id: number) => {
    props.handleDropdownData(id);
  };

  return (
    <div className="relative inline-block text-left mb-4">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          Ajouter un widget
          <ChevronDownIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
      {openDropdown && (
        <div
          className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none left-0 "
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {dropdownContent.map((item, index) => {
            return (
              <div
                key={index}
                className="py-1 hover:bg-gray-50 cursor-pointer"
                role="none"
                onClick={() => handleDropdown(index)}
              >
                <span className="text-gray-700 block px-4 py-2 text-sm">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
