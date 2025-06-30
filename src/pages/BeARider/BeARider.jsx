import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import UseAuth from "../../hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/UseAuth/useAxiosSecure";

// 26.2 created a rider form and send the data to db
const BeARider = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const warehouses = useLoaderData();

  // Extract unique regions
  useEffect(() => {
    const uniqueRegions = [...new Set(warehouses.map((item) => item.region))];
    setRegions(uniqueRegions);
  }, []);

  // Update districts based on selected region
  useEffect(() => {
    const filteredDistricts = warehouses
      .filter((item) => item.region === selectedRegion)
      .map((item) => item.district);
    setDistricts(filteredDistricts);
  }, [selectedRegion]);

  const onSubmit = (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName || "Anonymous",
      email: user?.email || "no-email@example.com",
      status: "Pending", // default
    };
    console.log(riderApplication);

    axiosSecure
      .post("/riders", riderApplication)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire("Success", "Rider application submitted!", "success");
          // reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">🏍️ Be A Rider</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name & Email (Read-only) */}
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full"
            {...register("name")}
          />
          <input
            type="email"
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full"
            {...register("email")}
          />
        </div>

        {/* Age & Phone */}
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="number"
            placeholder="Age"
            className="input input-bordered w-full"
            {...register("age", { required: true })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            {...register("phone", { required: true })}
          />
        </div>

        {/* Region → District */}
        <div className="flex flex-col lg:flex-row gap-4">
          <select
            {...register("region", { required: true })}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Region</option>
            {regions.map((region, idx) => (
              <option key={idx} value={region}>
                {region}
              </option>
            ))}
          </select>

          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
            disabled={!selectedRegion}
          >
            <option value="">Select District</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* NID & Bike Brand */}
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="National ID Card Number"
            className="input input-bordered w-full"
            {...register("nid", { required: true })}
          />
          <input
            type="text"
            placeholder="Bike Brand"
            className="input input-bordered w-full"
            {...register("bikeBrand", { required: true })}
          />
        </div>

        {/* Registration No & Additional Info */}
        <input
          type="text"
          placeholder="Bike Registration Number"
          className="input input-bordered w-full"
          {...register("bikeRegNumber", { required: true })}
        />

        <textarea
          {...register("extraInfo")}
          placeholder="Any other relevant information"
          rows={3}
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
