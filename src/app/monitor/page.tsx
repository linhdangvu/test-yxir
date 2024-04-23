"use client";

import LineChart from "@/components/base/chart/line-chart";
import { lineChart1 } from "@/data/charts/line-chart";
import React from "react";

const MonitorPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-3xl text-center font-semibold">
          Activités de surveillance
        </h1>
        <div className="mt-2">
          <LineChart
            data={lineChart1}
            title="Graphique des activités de surveillance"
          />
        </div>
      </div>
    </div>
  );
};

export default MonitorPage;
