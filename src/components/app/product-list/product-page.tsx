"use client";
import React, { useEffect, useState } from "react";
import TableWidget from "@/components/base/table/table-widget";
import Modal from "@/components/base/modal/modal";
import ProductModal from "@/components/app/product-list/productModal";
import { IProduct } from "@/interface/product";
import { useProduct } from "@/hooks/useProduct";
import { useDatetime } from "@/hooks/useDatetime";
import Loading from "@/components/base/loading/loading";
import TextLoading from "@/components/base/loading/text-loading";

const ProductPage = () => {
  // use hook
  const useProd = useProduct();
  const datetime = useDatetime();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [rowsData, setRowsData] = useState(null);
  const [product, setProduct] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [factory, setFactory] = useState("");
  const [isClose, setIsClose] = useState(false);

  // update product data from modal
  const handleChangeModal = (product: string, qtt: number, fac: string) => {
    setProduct(product);
    setQuantite(qtt);
    setFactory(fac);
  };

  // add product data
  const handleAddProduct = () => {
    setLoadingBtn(true);
    const prod: IProduct = {
      title: product,
      qtt: quantite,
      fac: factory,
      createdDate: new Date(),
    };
    // send to firebase
    useProd
      .fetchAddProductData(prod)
      .then((data: any) => {
        prod["id"] = data;
        prod["createdDate"] = datetime.toNanosecond(prod.createdDate);

        // set to DOM
        useProd.productData.push(prod);
        useProd.setData(useProd.productData);
        const productList: any = useProd.firebaseToProduct(useProd.productData);
        setRowsData(productList);
        setLoading(true);
        setLoadingBtn(false);
        setIsClose(true);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  };

  // clode modal
  const handleClose = (isOpen: boolean) => {
    setIsClose(isOpen);
  };

  // delete product
  const handleDeleteDoc = async (id: string) => {
    try {
      await useProd.deleteProductData(id);
      const data = useProd.productData.filter((item: any) => item.id !== id);
      useProd.setData(data);
    } catch (e) {
      console.error(e);
    }
  };

  // get product data
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

  // watch loading
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
          close={isClose}
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
                {loadingBtn ? <Loading /> : "Ajouter"}
              </button>
            </div>
          }
        />
      </div>
      {!loading && rowsData ? (
        <TableWidget
          data={rowsData}
          handleDelete={handleDeleteDoc}
          showAction
        />
      ) : (
        <TextLoading />
      )}
    </div>
  );
};

export default ProductPage;
