import React, { useEffect, useState } from "react";

const ProductEditModal = (props: any) => {
  // use hooks
  const [product, setProduct] = useState(props.data.title);
  const [quantite, setQuantite] = useState(props.data.qtt);
  const [factory, setFactory] = useState(props.data.fac);

  useEffect(() => {
    // sent to TableWidget
    props.handleChange(product, quantite, factory);
  });

  return (
    <div>
      <form>
        <div className="grid gap-6 mb-6 ">
          <div>
            <label
              htmlFor="name_product"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nom de produit
            </label>
            <input
              type="text"
              id="name_product"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ecrite un nom de produit..."
              required
              value={product}
              onChange={(e) => {
                setProduct(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              htmlFor="qtt"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantité
            </label>
            <input
              type="number"
              id="qtt"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quantité de produit"
              required
              value={quantite}
              onChange={(e) => {
                setQuantite(Number(e.target.value));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="fac"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Industries
            </label>
            <input
              type="text"
              id="fac"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ecrite un nom d'industrie..."
              required
              value={factory}
              onChange={(e) => {
                setFactory(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEditModal;
