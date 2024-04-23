"use client";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { getKpiData } from "@/utils/useFirebaseApi";
import LineChart from "@/components/base/chart/line-chart";
import Modal from "@/components/base/modal";
import KpiSetting from "@/components/app/kpi/kpiSetting";

interface Datasets {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

const KPIPage = () => {
  const [kpiData, setKpiData] = useState([]);
  const [loading, setLoading] = useState(true);

  const firebaseToKPI = (datasets: Datasets[]) => {
    const default_data: any = {
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top" as const,
          },
          title: {
            display: false,
            text: "KPI Chart Example",
          },
        },
      },

      data: {
        labels: [
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
        ],
        datasets: [],
      },
    };
    default_data["data"]["datasets"] = datasets;
    return default_data;
  };

  useEffect(() => {
    const fetchKpiData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = getKpiData();
          resolve(data);
        }, 1000);
      });
    };

    fetchKpiData()
      .then((data: any) => {
        const kpiList: any = [];
        data.map((item: any) => {
          const ndata = firebaseToKPI(item.datasets);
          console.log(ndata);
          kpiList.push(ndata);
        });
        setKpiData(kpiList);
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
      <h1 className="text-3xl text-center font-semibold">KPI</h1>

      <div className="flex justify-end mt-2">
        <Modal
          title="Ajout un KPI"
          titleModal="Parameter de l'ajoute de KPI"
          children={
            <div>
              <KpiSetting />
            </div>
          }
          action={
            <div className="mr-3">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Sauvegarde
              </button>
            </div>
          }
        ></Modal>

        {/* <form classNameName="group relative">
          <MagnifyingGlassIcon
            classNameName="w-6 h-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          />
          <input
            classNameName="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Chercher"
            placeholder="Chercher..."
            // value={search}
            // onChange={(e) => {
            //   setSearch(e.target.value);
            //   handleSearch(e.target.value);
            // }}
          ></input>
        </form> */}
      </div>

      <div className="mt-2">
        {!loading && kpiData.length != 0 && (
          <div className="grid grid-cols-2 gap-2">
            {kpiData.map((item: any, index: number) => (
              <div key={index}>
                <LineChart data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIPage;
