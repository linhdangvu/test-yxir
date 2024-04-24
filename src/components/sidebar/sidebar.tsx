"use client";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  HomeIcon,
  MapIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";

const SidebarPage = () => {
  const router = useRouter();
  const auth = useAuth();

  const logOut = () => {
    auth.isLogOut();
  };

  return (
    <div>
      <aside
        id="sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <HomeIcon className="h-6 w-6 text-white-500" />
                <span className="ms-3">Tableau de bord</span>
              </a>
            </li>
            <li>
              <a
                href="/kpi"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ChartBarIcon className="h-6 w-6 text-white-500" />
                <span className="ms-3">Graphique KPI</span>
              </a>
            </li>
            <li>
              <a
                href="/product-list"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <TableCellsIcon className="h-6 w-6 text-white-500" />
                <span className="ms-3">Liste de produits</span>
              </a>
            </li>
            <li>
              <a
                href="/carte"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MapIcon className="h-6 w-6 text-white-500" />
                <span className="ms-3">Cartes</span>
              </a>
            </li>
            <li>
              <a
                href="/monitor"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <ArrowTrendingUpIcon className="h-6 w-6 text-white-500" />
                <span className="ms-3">Activités de surveillance</span>
              </a>
            </li>
            <li>
              <a
                href="/auth/login"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                onClick={logOut}
              >
                <ArrowLeftStartOnRectangleIcon className="h-6 w-6 text-white-500" />
                <span className="ms-3">Déconnecter</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SidebarPage;
