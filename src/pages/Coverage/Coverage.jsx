import React from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

// 10.0 My requirement is create a Coverage component and show the map of service using react-leaflet leaflet. "npm install react-leaflet leaflet"

const Coverage = () => {
  // 10.4 fetch data to Coverage
  const services = useLoaderData();
  console.log(services);
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">
        We are available in 64 districts
      </h2>
      <BangladeshMap services={services}></BangladeshMap>
    </>
  );
};

export default Coverage;
