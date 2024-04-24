"use client";

import React, { useEffect, useState } from "react";
import LineChart from "@/components/base/chart/line-chart";
import TableWidget from "@/components/base/table/table-widget";
import { lineChart1, kpiChart } from "@/data/charts/line-chart";
import DropdownWidget from "@/components/base/dropdown/dropdown-widget";
import { useDashboard } from "@/hooks/useDashboard";
import { useProduct } from "@/hooks/useProduct";
import {
  ArrowRightStartOnRectangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import MapPage from "@/components/app/carte/map";
import TextLoading from "@/components/base/loading/text-loading";

const DashboardPage = () => {
  const dashboard = useDashboard();
  const product = useProduct();
  // const [loading, setLoading] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // get product data and take only 3 first data
  const handleProductData = (data: string, id: string) => {
    const n_data: any = {
      type: data,
      id: id,
    };
    product
      .fetchProductData()
      .then((data: any) => {
        const productList: any = product.firebaseToProduct(data.slice(0, 3));
        n_data["data"] = productList;
        setLoadingProduct(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return n_data;
  };

  // add data for dashboard
  const handleDropdown = (data: "table" | "kpi" | "carte" | "monitor") => {
    const send_data: any = {
      type: data,
    };
    // Send to Firestore
    dashboard
      .fetchAddDashboardData(send_data)
      .then((data: any) => {
        send_data["id"] = data;
      })
      .catch((e: any) => console.log(e));

    // Update data on DOM
    if (data === "table") {
      dashboard.dashboardData.push(handleProductData(data, send_data.id));
    } else if (data === "kpi") {
      dashboard.dashboardData.push({
        data: kpiChart,
        type: data,
        id: send_data.id,
      });
    } else if (data === "monitor") {
      dashboard.dashboardData.push({
        data: lineChart1,
        type: data,
        id: send_data.id,
      });
    } else {
      dashboard.dashboardData.push({
        data: [],
        type: data,
        id: send_data.id,
      });
    }
    dashboard.setData(dashboard.dashboardData);

    setLoadingDashboard(true);
  };

  // delete data from dashboard
  const handleDelete = (id: string) => {
    // delete for DOM
    const data = dashboard.dashboardData.filter((item: any) => item.id !== id);
    dashboard.setData(data);

    // delete from Firestore
    dashboard.deleteDashboardData(id);
  };

  // Get dashboard data
  useEffect(() => {
    dashboard
      .fetchDashboardData()
      .then((data: any) => {
        const new_data: any[] = data.map((item: any) => {
          switch (item.type) {
            case "kpi":
              return {
                data: kpiChart,
                type: item.type,
                id: item.id,
              };
            case "monitor":
              return {
                data: lineChart1,
                type: item.type,
                id: item.id,
              };
            case "table":
              return handleProductData(item.type, item.id);
            default:
              return {
                data: [],
                type: item.type,
                id: item.id,
              };
          }
        });

        dashboard.dashboardData = new_data;
        dashboard.setData(new_data);
        setLoadingDashboard(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Monotoring loading state
  useEffect(() => {
    // if (loading) setLoading(false);
    if (loadingDashboard) setLoadingDashboard(false);
    if (loadingProduct) setLoadingProduct(false);
  });

  return (
    <div>
      <div>
        <h1 className="text-center text-5xl m-4 ">Tableau de bord</h1>
        <div className="mb-2 text-right">
          <DropdownWidget handleDropdownData={handleDropdown} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {!loadingDashboard &&
            dashboard.dashboardData.map((item: any, index: number) => (
              <div key={index} className="relative ">
                <div className="absolute right-2 top-2 flex">
                  <XCircleIcon
                    onClick={() => handleDelete(item.id)}
                    className="w-6 h-6  hover:text-red-500 hover:cursor-pointer mr-2"
                  />
                  <a href={dashboard.getLinkDashboard(item.type)}>
                    <ArrowRightStartOnRectangleIcon className="w-6 h-6  hover:text-blue-500 hover:cursor-pointer" />
                  </a>
                </div>

                {item.type === "kpi" && (
                  <div className="w-full">
                    <LineChart data={item.data} title="Graphique KPI 2024" />
                  </div>
                )}

                {item.type === "monitor" && (
                  <div className="w-full">
                    <LineChart
                      data={item.data}
                      title="Activité de surveillance"
                    />
                  </div>
                )}

                {item.type === "table" && !loadingProduct && item.data && (
                  <div className="w-full border-2 border-black p-4 rounded-lg">
                    <h3 className="text-center  text-lg font-semibold">
                      Liste de produit
                    </h3>
                    <TableWidget data={item.data} isDemo />
                  </div>
                )}

                {item.type === "table" && (loadingProduct || !item.data) && (
                  <div className="w-full border-2 border-black p-4 rounded-lg">
                    <TextLoading />
                  </div>
                )}

                {item.type === "carte" && item.data && (
                  <div className="w-full ">
                    {/* <h3 className="text-center  text-lg font-semibold">Carte</h3> */}
                    <MapPage isDemo />
                  </div>
                )}
              </div>
            ))}

          {(loadingDashboard || dashboard.dashboardData.length === 0) && (
            <div>
              {" "}
              <TextLoading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
