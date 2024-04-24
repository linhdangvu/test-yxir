import {
  addFirebaseData,
  deleteFirebaseData,
  getFirebaseData,
} from "./useFirebaseApi";
import { useState } from "react";
import { IDashboard } from "@/interface/dashboard";

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState<IDashboard[]>([]);
  const TIME_OUT = 500;

  // set data for dashboard state, but not working well ???
  const setData = (data: IDashboard[]) => {
    setDashboardData(data);
  };

  // get data from dashboard
  const fetchDashboardData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = getFirebaseData("Dashboard");
        resolve(data);
      }, TIME_OUT);
    });
  };

  // delete data from dashboard
  const deleteDashboardData = async (id: string) => {
    await deleteFirebaseData("Dashboard", id);
  };

  // get add data id
  const fetchAddDashboardData = (dash: IDashboard) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = addFirebaseData("Dashboard", dash);
        resolve(data);
      }, TIME_OUT);
    });
  };

  // get link by type on dashboard
  const getLinkDashboard = (type: string) => {
    switch (type) {
      case "kpi":
        return "/kpi";
      case "monitor":
        return "/monitor";
      case "table":
        return "/product-list";
      case "carte":
        return "/carte";
      default:
        return "/";
    }
  };

  return {
    dashboardData,
    fetchDashboardData,
    setData,
    deleteDashboardData,
    fetchAddDashboardData,
    getLinkDashboard,
  };
};
