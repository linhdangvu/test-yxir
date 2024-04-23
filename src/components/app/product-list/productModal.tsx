import React, { useEffect, useState } from "react";

const ProductModal = (props: any) => {
  const [product, setProduct] = useState("");
  const [quantite, setQuantite] = useState(0);
  const [factory, setFactory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
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
        {/* <div className="text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Ajouter
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default ProductModal;
