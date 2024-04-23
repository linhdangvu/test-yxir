import React, { useEffect, useState } from "react";
import DatasetSetting from "./datasetSetting";
import Button from "@/components/base/button";

const KpiSetting = () => {
  const [month, setMonth] = useState("Janvier");
  const [monthId, setMonthId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [prodYeild, setProdYeild] = useState([
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [defautRate, setDefautRate] = useState([
    0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [delivery, setDelivery] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [feedback, setFeedback] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const months = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Aout",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];
  const getMonthIndex = (month: string) => {
    switch (month) {
      case "Fevrier":
        return 1;
      case "Mars":
        return 2;
      case "Avril":
        return 3;
      case "Mai":
        return 4;
      case "Juin":
        return 5;
      case "Juillet":
        return 6;
      case "Aout":
        return 7;
      case "Septembre":
        return 8;
      case "Octobre":
        return 9;
      case "Novembre":
        return 10;
      case "Decembre":
        return 11;
      default:
        return 0;
    }
  };

  const handleRangeChange = (event: any, monthId: number) => {
    const nVal = parseInt(event.target.value);
    prodYeild[monthId] = nVal;
    console.log(prodYeild);
    setProdYeild(prodYeild);
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  });
  return (
    <div className="md:flex">
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
        {months.map((item: any, index: number) => (
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
                  setMonthId(getMonthIndex(item));
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
            />

            <DatasetSetting title="Taux de défauts" val={defautRate[monthId]} />

            <DatasetSetting title="Livraison à temps" val={delivery[monthId]} />

            <DatasetSetting title="Commentaires" val={feedback[monthId]} />
          </div>
        )}
        <div className="my-4 text-right">
          <Button title="Enregistre" bgColor="green" />
        </div>
      </div>
    </div>
  );
};

export default KpiSetting;
