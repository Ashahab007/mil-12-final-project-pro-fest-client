import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAuth/useAxiosSecure";
import UseAuth from "../../hooks/UseAuth/UseAuth";
// 11.0 Now my requirement is create a send parcel for user using react hook form

const SendParcel = () => {
  const { user } = UseAuth();
  // 14.0 my requirement is save the data to the server using post method

  // 14.1 call the hook
  const axiosSecure = useAxiosSecure();

  const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  };

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

  const onSubmit = (data) => {
    const isSameDistrict = data.senderCenter === data.receiverCenter;
    const weight = parseFloat(data.parcelWeight || 0);
    let breakdownHtml = "";
    let cost = 0;

    // === Cost Calculation & Breakdown ===
    if (data.parcelType === "document") {
      cost = isSameDistrict ? 60 : 80;
      breakdownHtml = `
        <div style="text-align: left">
          <strong>Parcel Type:</strong> Document<br/>
          <strong>Delivery:</strong> ${
            isSameDistrict ? "Within District" : "Outside District"
          }<br/>
          <strong>Cost:</strong> ৳${cost}
        </div>
      `;
    } else {
      if (weight <= 3) {
        cost = isSameDistrict ? 110 : 150;
        breakdownHtml = `
          <div style="text-align: left">
            <strong>Parcel Type:</strong> Non-Document (≤3kg)<br/>
            <strong>Delivery:</strong> ${
              isSameDistrict ? "Within District" : "Outside District"
            }<br/>
            <strong>Base Cost:</strong> ৳${cost}
          </div>
        `;
      } else {
        const extraKg = weight - 3;
        const extraCost = extraKg * 40;
        cost = isSameDistrict ? 110 + extraCost : 150 + extraCost + 40;

        breakdownHtml = `
          <div style="text-align: left">
            <strong>Parcel Type:</strong> Non-Document (>3kg)<br/>
            <strong>Delivery:</strong> ${
              isSameDistrict ? "Within District" : "Outside District"
            }<br/>
            <strong>Base Cost:</strong> ৳${isSameDistrict ? 110 : 150}<br/>
            <strong>Extra Weight (${extraKg}kg):</strong> ৳${extraCost}<br/>
            ${
              !isSameDistrict
                ? "<strong>Outside District Fee:</strong> ৳40<br/>"
                : ""
            }
            <strong>Total:</strong> ৳${cost}
          </div>
        `;
      }
    }

    // === Show SweetAlert Modal ===
    Swal.fire({
      title: "📦 Delivery Cost Breakdown",
      html: breakdownHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Ready for Payment",
      cancelButtonText: "✏️ Continue Editing",
      customClass: {
        popup: "text-sm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const creation_date = new Date().toISOString();
        const delivery_status = "Pending";
        const payment_status = "Unpaid";
        const tracking_id = generateTrackingID();

        const parcelData = {
          ...data,
          totalCost: cost,
          creation_date,
          delivery_status,
          payment_status,
          tracking_id,
          userEmail: user.email,
        };

        // 14.2
        axiosSecure.post("/parcels", parcelData).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            // todo: redirect to the payment page using Swal.fire
            // Swal.fire
          }
        });

        // Simulate saving
        console.log("📦 Parcel Info Saved:", parcelData);
        toast.success("Parcel info confirmed & saved ✅");

        // setConfirmed(true);
        // reset();
      }
    });
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
      </form>
    </div>
  );
};

export default SendParcel;
