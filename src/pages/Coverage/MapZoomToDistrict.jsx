import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapZoomToDistrict = ({ coordinates }) => {
  const map = useMap();
  console.log(coordinates);

  useEffect(() => {
    if (coordinates) {
      map?.flyTo(coordinates, 12, { duration: 1.5 }); // Zoom level 12 when district found
    }
  }, [coordinates, map]);
  return null;
};

export default MapZoomToDistrict;
