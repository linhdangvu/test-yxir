import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useProduct } from "@/hooks/useProduct";
import Modal from "../modal/modal";
import ProductEditModal from "@/components/app/product-list/productEditModal";
import { useDatetime } from "@/hooks/useDatetime";
import TextLoading from "../loading/text-loading";
import Loading from "../loading/loading";

interface TableData {
  columns: any[];
  rows: any[];
}

const TableWidget = (props: {
  data: TableData;
  handleDelete?: any;
  showAction?: boolean;
  isDemo?: boolean;
}) => {
  // use hooks
  const useProd = useProduct();
  const datetime = useDatetime();

  const [filteredDara, setFilteredData] = useState(props.data.rows);
  const [colData, setColData] = useState(props.data.columns);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [search, setSearch] = useState("");
  const [isClose, setIsClose] = useState(false);
  const [product, setProduct] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [factory, setFactory] = useState("");
  const [currentEditId, setCurrentEditId] = useState("");
  const [showAction, setShowAction] = useState(props.showAction); // show action delete é edit

  // ----- SORT TABLE -----
  // sort a-z 1-2
  const handleSortedData = (idCol: number) => {
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

  // sort z-a 2-1
  const handleSortedInverse = (id: number) => {
    colData[id].filtered = !colData[id].filtered;
    setColData(colData);
    const data = filteredDara.reverse();
    setFilteredData(data);
    setLoading(true);
  };

  // search by title and factory
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

  // delete product
  const handleDelete = (id: string) => {
    props.handleDelete(id);
    const data = filteredDara.filter((item: any) => item.id !== id);
    setFilteredData(data);
  };

  // ----- MODAL -----
  // get modal from ProductEditModal
  const handleChangeModal = (product: string, qtt: number, fac: string) => {
    setProduct(product);
    setQuantite(qtt);
    setFactory(fac);
  };

  // close modal
  const handleClose = (isOpen: boolean) => {
    setIsClose(isOpen);
  };

  // send edit data to firebase
  const handleEditProduct = () => {
    setLoadingBtn(true);
    const edit_data = {
      // id: currentEditId,
      title: product,
      qtt: quantite,
      fac: factory,
    };
    const index = filteredDara.findIndex((item) => item.id === currentEditId);
    if (index !== -1) {
      filteredDara[index]["title"] = edit_data["title"];
      filteredDara[index]["qtt"] = edit_data["qtt"];
      filteredDara[index]["fac"] = edit_data["fac"];
      console.log("Item updated successfully.");
    } else {
      console.log(`Item with ID ${currentEditId} not found in the array.`);
    }
    // edit for DOM
    setFilteredData(filteredDara);

    // Send to Firebase
    useProd.editProductData(currentEditId, edit_data);
    setLoadingBtn(false);
    setIsClose(true);
  };

  // watch loading
  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  });

  return (
    <div className="">
      {!props.isDemo && (
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
      )}

      {!props.isDemo ? (
        // TABLE SHOW ON PRODUCT LIST
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
                          onClick={() => handleSortedData(index)}
                        >
                          {item.title}
                          <ChevronDownIcon className="w-5 h-5 ml-2 mt-1" />
                        </span>
                      )}
                    </th>
                  ))}
                {showAction && (
                  <th className="py-2 px-4 border-gray-100 border-2 bg-gray-300 dark:bg-gray-300">
                    <span className="flex justify-center ">Action</span>
                  </th>
                )}
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
                          ? datetime.convertFirebaseDate(rowData[item.key])
                          : rowData[item.key]}
                      </td>
                    ))}
                    {showAction && (
                      <td className="border-gray-100 border-2 p-2 text-center">
                        <div className="flex justify-center">
                          <TrashIcon
                            onClick={() => handleDelete(rowData.id)}
                            className="w-8 h-8 text-black hover:cursor-pointer hover:text-red-500"
                          />
                          <div onClick={() => setCurrentEditId(rowData.id)}>
                            <Modal
                              close={isClose}
                              title=""
                              icon={
                                <PencilSquareIcon className="w-8 h-8 text-black hover:cursor-pointer hover:text-yellow-500" />
                              }
                              titleModal="Edit"
                              children={
                                <ProductEditModal
                                  handleChange={handleChangeModal}
                                  data={rowData}
                                />
                              }
                              action={
                                <div className="mr-3">
                                  <button
                                    data-modal-hide="default-modal"
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={handleEditProduct}
                                  >
                                    {loadingBtn ? <Loading /> : "Modifier"}
                                  </button>
                                </div>
                              }
                              updateClose={handleClose}
                            />
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              {loading && <TextLoading />}
            </tbody>
          </table>
        </div>
      ) : (
        // TABLE SHOW ON DASHBOARD
        <div className="table-widget text-black  dark:text-black">
          <table className="table w-full">
            <thead>
              <tr className="table-head text-sm uppercase p-2">
                {!loading &&
                  props.data.columns.map((item, index) => (
                    <th
                      className="py-2 px-4 border-gray-100 border-2 bg-gray-300 dark:bg-gray-300"
                      key={index}
                    >
                      {item.filtered ? (
                        <span className="flex justify-center hover:cursor-pointer">
                          {item.title}
                        </span>
                      ) : (
                        <span className="flex justify-center hover:cursor-pointer">
                          {item.title}
                        </span>
                      )}
                    </th>
                  ))}
                {loading && <TextLoading />}
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
                          ? datetime.convertFirebaseDate(rowData[item.key])
                          : rowData[item.key]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableWidget;
