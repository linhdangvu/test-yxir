import React, { useEffect, useState } from "react";
import Button from "@/components/base/button";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteProductData } from "@/utils/useFirebaseApi";
import { useProduct } from "@/utils/useProduct";

interface TableData {
  columns: any[];
  rows: any[];
}

const TableWidget = (props: { data: TableData; handleDelete: any }) => {
  const [filteredDara, setFilteredData] = useState(props.data.rows);
  const [colData, setColData] = useState(props.data.columns);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const useProd = useProduct();

  const handleSortedData = (name: string, idCol: number) => {
    const colPos = props.data.columns[idCol].key;
    colData.map((item, index) => {
      if (idCol == index) {
        item.filtered = true;
      } else {
        item.filtered = false;
      }
    });
    setColData(colData);
    const data = filteredDara.sort((a, b) => (a[colPos] < b[colPos] ? -1 : 1));
    setFilteredData(data);
    setLoading(true);
  };

  const handleDelete = (id: string) => {
    props.handleDelete(id);
    const data = filteredDara.filter((item: any) => item.id !== id);
    setFilteredData(data);
  };

  const handleSortedInverse = (id: number) => {
    colData[id].filtered = !colData[id].filtered;
    setColData(colData);
    const data = filteredDara.reverse();
    setFilteredData(data);
    setLoading(true);
  };

  const handleSearch = (search: string) => {
    if (!search) {
      setFilteredData(props.data.rows);
      setLoading(true);
    } else {
      const data = filteredDara.filter((item: any) => {
        return (
          item.title.match(new RegExp(search, "i")) ||
          item.fac.match(new RegExp(search, "i"))
        );
      });
      setFilteredData(data);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  });

  return (
    <div className="py-2 my-4">
      <div className="flex justify-end mx-2">
        <form className="group relative">
          <MagnifyingGlassIcon
            className="w-6 h-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          />
          <input
            className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Chercher"
            placeholder="Chercher..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
          ></input>
        </form>
      </div>

      <div className="table-widget text-black mt-4 dark:text-black">
        <table className="table w-full">
          <thead>
            <tr className="table-head text-lg uppercase ">
              {!loading &&
                props.data.columns.map((item, index) => (
                  <th
                    className="py-2 px-4 border-gray-100 border-2 bg-gray-300 dark:bg-gray-300"
                    key={index}
                  >
                    {item.filtered ? (
                      <span
                        className="flex justify-center hover:cursor-pointer"
                        onClick={() => handleSortedInverse(index)}
                      >
                        {item.title}
                        <ChevronUpIcon className="w-5 h-5 ml-2 mt-1" />
                      </span>
                    ) : (
                      <span
                        className="flex justify-center hover:cursor-pointer"
                        onClick={() => handleSortedData(item, index)}
                      >
                        {item.title}
                        <ChevronDownIcon className="w-5 h-5 ml-2 mt-1" />
                      </span>
                    )}
                  </th>
                ))}
              <th className="py-2 px-4 border-gray-100 border-2 bg-gray-300 dark:bg-gray-300">
                <span className="flex justify-center ">Action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              filteredDara.map((rowData, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                  {props.data.columns.map((item, index) => (
                    <td
                      className="border-gray-100 border-2 p-2 text-center "
                      key={index}
                    >
                      {item.key == "createdDate"
                        ? JSON.stringify(rowData[item.key])
                        : rowData[item.key]}
                    </td>
                  ))}
                  <td className="border-gray-100 border-2 p-2 text-center">
                    <div className="flex justify-center">
                      <TrashIcon
                        onClick={() => handleDelete(rowData.id)}
                        className="w-8 h-8 text-black hover:cursor-pointer hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableWidget;
