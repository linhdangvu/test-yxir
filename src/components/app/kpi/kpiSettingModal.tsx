import React, { useEffect, useState } from "react";
import DatasetSetting from "./datasetSetting";
import Button from "@/components/base/button/button";
import { useDatetime } from "@/hooks/useDatetime";

const KpiSetting = (props: any) => {
  const useDate = useDatetime();
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState("Janvier");
  const [monthId, setMonthId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [prodYeild, setProdYeild] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [defautRate, setDefautRate] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [delivery, setDelivery] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [feedback, setFeedback] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const handleRangeChange = (event: any, monthId: number) => {
    const nVal = parseInt(event.target.value);
    prodYeild[monthId] = nVal;
    console.log(prodYeild);
    setProdYeild(prodYeild);
    setLoading(true);
  };

  // MODAL FUNCTION
  const handleUpdateRP = (val: number) => {
    prodYeild[monthId] = val;
    setProdYeild(prodYeild);
  };

  const handleUpdateDR = (val: number) => {
    defautRate[monthId] = val;
    setDefautRate(defautRate);
  };

  const handleUpdateD = (val: number) => {
    delivery[monthId] = val;
    setDelivery(delivery);
  };

  const handleUpdateFB = (val: number) => {
    feedback[monthId] = val;
    setFeedback(feedback);
  };

  // const handleSave = () => {};

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
    props.updateData(prodYeild, defautRate, delivery, feedback, title);
  });
  return (
    <div>
      <form>
        <div className="grid gap-6 mb-6 ">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Titre
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ecrite un titre..."
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
      </form>
      <div className="md:flex">
        <ul className="grid grid-cols-2 gap-2 w-1/2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {useDate.months.map((item: any, index: number) => (
            <li key={index}>
              {item == month ? (
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600"
                >
                  {item}
                </a>
              ) : (
                <a
                  onClick={() => {
                    setMonth(item);
                    setMonthId(useDate.getMonthIndex(item));
                    setLoading(true);
                  }}
                  href="#"
                  className="inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {item}
                </a>
              )}
            </li>
          ))}
        </ul>
        {loading && <div>Loading </div>}
        <div className="w-full">
          {!loading && (
            <div className="grid gap-2 ">
              <DatasetSetting
                title="Rendement de production"
                val={prodYeild[monthId]}
                updateVal={handleUpdateRP}
              />

              <DatasetSetting
                title="Taux de défauts"
                val={defautRate[monthId]}
                updateVal={handleUpdateDR}
              />

              <DatasetSetting
                title="Livraison à temps"
                val={delivery[monthId]}
                updateVal={handleUpdateD}
              />

              <DatasetSetting
                title="Commentaires"
                val={feedback[monthId]}
                updateVal={handleUpdateFB}
              />
            </div>
          )}
          {/* <div className="my-4 text-right" onClick={handleSave}>
          <Button title="Enregistre" bgColor="green" />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default KpiSetting;
