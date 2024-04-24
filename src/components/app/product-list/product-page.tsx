"use client";
import React, { useEffect, useState } from "react";
import { table_1 } from "@/data/tables/tables";
import TableWidget from "@/components/base/table/table-widget";
import Modal from "@/components/base/modal/modal";
import ProductModal from "@/components/app/product-list/productModal";
import { IProduct } from "@/interface/product";
import { useProduct } from "@/hooks/useProduct";
import { useDatetime } from "@/hooks/useDatetime";

const ProductPage = () => {
  const [productData, setProductData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowsData, setRowsData] = useState(null);
  const [product, setProduct] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [factory, setFactory] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const useProd = useProduct();
  const datetime = useDatetime();

  const handleChangeModal = (product: string, qtt: number, fac: string) => {
    setProduct(product);
    setQuantite(qtt);
    setFactory(fac);
  };

  const handleAddProduct = () => {
    const prod: IProduct = {
      title: product,
      qtt: quantite,
      fac: factory,
      createdDate: new Date(),
    };

    useProd
      .fetchAddProductData(prod)
      .then((data: any) => {
        prod["id"] = data;
        prod["createdDate"] = datetime.toNanosecond(prod.createdDate);
        useProd.productData.push(prod);
        useProd.setData(useProd.productData);

        const productList: any = useProd.firebaseToProduct(useProd.productData);
        setRowsData(productList);

        setLoading(true);
        setOpenModal(true);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  };

  const handleClose = (isOpen: boolean) => {
    setOpenModal(isOpen);
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      await useProd.deleteProductData(id);
      const data = useProd.productData.filter((item: any) => item.id !== id);
      useProd.setData(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    useProd
      .fetchProductData()
      .then((data: any) => {
        useProd.setData(data);
        const productList: any = useProd.firebaseToProduct(data);
        setRowsData(productList);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching Kpi data:", error);
      });
  }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  });

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold">Liste des produits</h1>
      <div className="absolute mt-2">
        <Modal
          close={openModal}
          updateClose={handleClose}
          title="Ajoute un produit"
          titleModal="Ajouter un produit"
          children={<ProductModal handleChange={handleChangeModal} />}
          action={
            <div className="mr-3">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddProduct}
              >
                Ajouter
              </button>
            </div>
          }
        />
      </div>
      {!loading && rowsData && (
        <TableWidget
          data={rowsData}
          handleDelete={handleDeleteDoc}
          showAction
        />
      )}
    </div>
  );
};

export default ProductPage;
