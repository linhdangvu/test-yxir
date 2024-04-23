"use client";
import React, { useState } from "react";
import { table_1 } from "@/data/tables/tables";
import TableWidget from "@/components/base/table/table-widget";
import Modal from "@/components/base/modal";
import ProductModal from "@/components/app/product-list/productModal";

const ProductList = () => {
  const [tableData, setTableData] = useState(table_1);

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold">Liste des produits</h1>
      <div className="absolute mt-2">
        <Modal
          title="Ajoute un produit"
          titleModal="Ajouter un produit"
          children={<ProductModal />}
          action={
            <div className="mr-3">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ajouter
              </button>
            </div>
          }
        />
      </div>

      <TableWidget data={tableData} />
    </div>
  );
};

export default ProductList;
