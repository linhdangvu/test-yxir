"use client";
import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import LineChart from "@/components/base/chart/line-chart";
import Modal from "@/components/base/modal/modal";
import KpiSettingModal from "@/components/app/kpi/kpiSettingModal";
import { useKpiData } from "@/hooks/useKpiData";
import { IKpi } from "@/interface/kpi";
import Loading from "@/components/base/loading/loading";

const KPIPage = () => {
  // use hooks
  const useKpi = useKpiData();
  const [kpiData, setKpiData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [title, setTitle] = useState("");
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

  // ----- Modal Function -----
  // Clode modal
  const handleClose = (isOpen: boolean) => {
    setIsClose(isOpen);
  };

  // Add kip data to firebase
  const handleAddKpi = () => {
    setLoadingBtn(true);
    const kpi: IKpi = {
      title: title,
      datasets: [
        {
          label: "Rendement de production",
          data: prodYeild,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Taux de défauts",
          data: defautRate,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Livraison à temps",
          data: delivery,
          borderColor: "rgb(247, 210, 176)",
          backgroundColor: "rgba(247, 210, 176, 0.5)",
        },
        {
          label: "Commentaires",
          data: feedback,
          borderColor: "rgb(74, 145, 93)",
          backgroundColor: "rgba(74, 145, 93, 0.5)",
        },
      ],
    };

    // add to firebase
    useKpi
      .fetchAddKpiData(kpi)
      .then((id: any) => {
        const kpiList: any = useKpi.firebaseToKPI(kpi.datasets);
        kpiList["id"] = id;
        kpiList["title"] = title;

        // add to DOM
        kpiData.push(kpiList);
        setKpiData(kpiData);
        setLoading(true);
        setLoadingBtn(false);
        setIsClose(true);
      })
      .catch((error) => {
        console.error("Error fetching kpi data:", error);
      });

    // setIsClose(true);
  };

  // data update from KPI setting modal
  const handleUpdateData = (
    prodYeild: number[],
    defautRate: number[],
    delivery: number[],
    feedback: number[],
    title: string
  ) => {
    setProdYeild(prodYeild);
    setDefautRate(defautRate);
    setDelivery(delivery);
    setFeedback(feedback);
    setTitle(title);
  };

  // delete kpi
  const handleDelete = async (id: string) => {
    // Delete on DOM
    const data = kpiData.filter((item: any) => item.id != id);
    setKpiData(data);
    setLoading(true);

    // Delete from Firebase
    await useKpi.deleteKpiData(id);
  };

  // get kpi data
  useEffect(() => {
    useKpi
      .fetchKpiData()
      .then((data: any) => {
        const kpiList: any = [];
        data.map((item: any) => {
          const ndata = useKpi.firebaseToKPI(item.datasets);
          kpiList.push({ ...ndata, ...{ id: item.id, title: item.title } });
        });
        setKpiData(kpiList);
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
      <h1 className="text-3xl text-center font-semibold">KPI</h1>

      <div className="flex justify-end mt-2">
        <Modal
          close={isClose}
          updateClose={handleClose}
          title="Ajoute un KPI"
          titleModal="Parameter de l'ajoute de KPI"
          children={
            <div>
              <KpiSettingModal updateData={handleUpdateData} />
            </div>
          }
          action={
            <div className="mr-3">
              <button
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={handleAddKpi}
              >
                {loadingBtn ? <Loading /> : "Ajouter"}
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
              <div key={index} className="relative">
                <XCircleIcon
                  onClick={() => handleDelete(item.id)}
                  className="absolute right-4 top-4 text-right w-6 h-6   hover:cursor-pointer hover:text-red-500"
                />
                <LineChart
                  data={item}
                  title={item.title ? item.title : "KPI"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIPage;
