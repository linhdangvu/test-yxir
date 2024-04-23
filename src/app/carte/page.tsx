"use client";

import MapPage from "@/components/app/carte/map";
import React from "react";

const CartePage = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold">Cartes</h1>
      <div className="mt-2">
        <MapPage />
      </div>
    </div>
  );
};

export default CartePage;
