import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
// 11.0 Now my requirement is create a send parcel for user using react hook form

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [showWeight, setShowWeight] = useState(false);

  const services = useLoaderData();

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setShowWeight(type === "non-document");
  };

  // const senderCenter = watch("senderCenter");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // extract the region and remove duplicates
  const regions = [...new Set(services.map((d) => d.region))];

  // show the districts by region
  const getDistrictsByRegion = (region) =>
    services.filter((d) => d.region === region).map((d) => d.district);
  // console.log(getDistrictsByRegion());

  // cost calculation
  const calCulateCost = (type, weight, isSameDistrict) => {
    if (type === "document") {
      return isSameDistrict ? 60 : 80;
    }
    const wt = parseFloat(weight || 0);
    if (weight <= 3) {
      return isSameDistrict ? 110 : 150;
    }

    const extrKg = wt - 3;
    const extrCost = extrKg * 40;
    return isSameDistrict ? 110 + extrCost : 150 + extrCost + 40;
  };

  const onSubmit = (data) => {
    const isSameDistrict = data.senderCenter === data.receiverCenter;
    const cost = calCulateCost(
      data.parcelType,
      data.parcelWeight,
      isSameDistrict
    );
    setDeliveryCost(cost);
    toast.success(`Your Delivery Cost is ${cost}`);
    console.log(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-2">Door to Door Delivery Form</h2>
      <p className="text-sm text-gray-500 mb-6">
        As the system is based on Door to Door delivery, Parcel needs both
        pickup and delivery location.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* --- Parcel Info --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Parcel Info</h3>

          <div className="form-control">
            <label className="label">Parcel Type</label>
            <div className="flex gap-4">
              <label className="label cursor-pointer">
                <input
                  {...register("parcelType", { required: true })}
                  type="radio"
                  value="document"
                  onChange={handleTypeChange}
                  className="radio checked:bg-blue-500"
                  defaultChecked
                />
                <span className="ml-2">Document</span>
              </label>

              <label className="label cursor-pointer">
                <input
                  {...register("parcelType", { required: true })}
                  type="radio"
                  value="non-document"
                  onChange={handleTypeChange}
                  className="radio checked:bg-blue-500"
                />
                <span className="ml-2">Non-Document</span>
              </label>
            </div>
          </div>

          <div className="form-control">
            <label className="label">Parcel Title</label>
            <input
              {...register("parcelTitle", { required: true })}
              className="input input-bordered"
              placeholder="e.g. Legal Documents"
            />
            {errors.parcelTitle && (
              <span className="text-red-500 text-sm">Title is required</span>
            )}
          </div>

          {showWeight && (
            <div className="form-control">
              <label className="label">Parcel Weight (kg)</label>
              <input
                {...register("parcelWeight")}
                type="number"
                step="0.1"
                className="input input-bordered"
                placeholder="e.g. 2.5"
              />
            </div>
          )}
        </div>

        {/* --- Sender Info --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sender Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input
                {...register("senderName", { required: true })}
                // defaultValue={userName}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Contact</label>
              <input
                {...register("senderContact", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Select Region</label>
              <select
                {...register("senderRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">-- Select Region --</option>
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Select Service Center</label>
              <select
                {...register("senderCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">-- Select Service Center --</option>
                {getDistrictsByRegion(senderRegion).map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input
                {...register("senderAddress", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Pickup Instruction</label>
              <textarea
                {...register("senderInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          </div>
        </div>

        {/* --- Receiver Info --- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Receiver Info</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Name</label>
              <input
                {...register("receiverName", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Contact</label>
              <input
                {...register("receiverContact", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Select Region</label>
              <select
                {...register("receiverRegion", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">-- Select Region --</option>
                {regions.map((region, idx) => (
                  <option key={idx} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Select Service Center</label>
              <select
                {...register("receiverCenter", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">-- Select Service Center --</option>
                {getDistrictsByRegion(receiverRegion).map((district, idx) => (
                  <option key={idx} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="label">Address</label>
              <input
                {...register("receiverAddress", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">Delivery Instruction</label>
              <textarea
                {...register("receiverInstruction", { required: true })}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>

        {/*  {deliveryCost && !confirmed && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">
              Delivery Cost:{" "}
              <span className="text-green-600">৳{deliveryCost}</span>
            </p>
            <button onClick={handleConfirm} className="btn btn-success mt-2">
              Confirm & Save
            </button>
          </div>
        )} */}
      </form>
    </div>
  );
};

export default SendParcel;
