"use client";

import React, { useState } from "react";
import MyButton from "@/components/base/button";
import LineChart from "@/components/base/chart/line-chart";
import TableWidget from "@/components/base/table/table-widget";
import { table_1 } from "@/data/tables/tables";
import TableWidget2 from "@/components/base/table-widget-2";
import { lineChart1, kpiChart } from "@/data/charts/line-chart";
import DropdownWidget from "@/components/base/dropdown-widget";

const HomePage = () => {
  const [tableData, setTableData] = useState(table_1);

  return (
    <div>
      <h1 className="text-center text-5xl m-4 ">Tableau de bord</h1>
      <div className="mb-2">
        <DropdownWidget />
      </div>
      <div className="w-2/4">
        <LineChart data={kpiChart} title="Graphique KPI 2024" />
      </div>
      <div className="w-2/4">
        <TableWidget data={tableData} />
      </div>
      <div className="w-2/4">
        <LineChart
          data={lineChart1}
          title="Graphique des activités de surveillance"
        />
      </div>
    </div>
  );
};

export default HomePage;
