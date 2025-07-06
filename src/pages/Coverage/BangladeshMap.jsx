import React, { useState } from "react";
import MapZoomToDistrict from "./MapZoomToDistrict";
// 10.1 import the following twoes
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 10.2 create the component BangladeshMap and by using ai
// 10.5 get the services data
const BangladeshMap = ({ services }) => {
  // 10.3 as the data found for one co-ordination. we need 64 district co-ordination which is in public folder "warehouse.json". copy the data from "warehouse.json" and give it to ai to modify it for 64 district and implement search functionality to search the specific district upon search

  const dhakaCoordinates = [23.8103, 90.4125]; // Centered on Dhaka

  const [searchInput, setSearchInput] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const service = services.find(
      (d) => d.district?.toLowerCase() === searchInput.toLowerCase().trim()
    );
    if (service) {
      setCoordinates([service?.latitude, service?.longitude]);
    } else {
      setCoordinates(alert("Not Found"));
    }
  };
  return (
    <div className=" my-10 px-4 max-w-6xl mx-auto">
      <div className="flex">
        {/* Optional search field (later) */}
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-sm mx-auto mb-6 block"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="h-[600px] w-full">
        <MapContainer
          center={dhakaCoordinates}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full rounded-lg shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {coordinates && (
            <MapZoomToDistrict coordinates={coordinates}></MapZoomToDistrict>
          )}

          {services.map((service, idx) => (
            <Marker
              key={idx}
              position={[service?.latitude, service?.longitude]}
            >
              <Popup>
                <h3 className="font-bold">{service.district}</h3>
                <p className="text-sm">
                  <strong>Region:</strong> {service.region}
                  <br />
                  <strong>City:</strong> {service.city}
                  <br />
                  <strong>Areas:</strong> {service.covered_area.join(", ")}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default BangladeshMap;
