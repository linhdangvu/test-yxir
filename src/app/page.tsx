"use client";

import React, { useEffect, useState } from "react";
import LineChart from "@/components/base/chart/line-chart";
import TableWidget from "@/components/base/table/table-widget";
import { table_1 } from "@/data/tables/tables";
import { lineChart1, kpiChart } from "@/data/charts/line-chart";
import DropdownWidget from "@/components/base/dropdown-widget";
import { getKpiData } from "@/utils/useFirebaseApi";

const HomePage = () => {
  const [tableData, setTableData] = useState(table_1);
  const [chartData, setChartData] = useState(null);

  const handleDropdown = (data: number) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchUserData = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = getKpiData();
          resolve(data);
        }, 1000);
      });
    };

    fetchUserData()
      .then((data: any) => {
        setChartData(data); // Update state with the retrieved user data
      })
      .catch((error) => {
        // Handle any errors that occur during the Promise execution
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center text-5xl m-4 ">Tableau de bord</h1>
      <p>{JSON.stringify(chartData)}</p>
      <div className="mb-2">
        <DropdownWidget handleDropdownData={handleDropdown} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="">
          <LineChart data={kpiChart} title="Graphique KPI 2024" />
        </div>
        <div className="">
          <TableWidget data={tableData} />
        </div>
        <div className="">
          <LineChart
            data={lineChart1}
            title="Graphique des activités de surveillance"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
