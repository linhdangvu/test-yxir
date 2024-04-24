import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
// import "./map.css";
import { mapData } from "@/data/map/map-data";

const MapPage = (props: { isDemo?: boolean }) => {
  return (
    <div className="w-full h-full border-2 border-black p-4 rounded-lg">
      <h3 className="text-center  text-lg font-semibold">Globe</h3>
      <ComposableMap
        className={!props.isDemo ? "w-full mx-auto" : " w-8/12 mx-auto"}
      >
        <Geographies geography={mapData}>
          {({ geographies }) =>
            geographies.map((geo: any) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapPage;
