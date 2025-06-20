import React from "react";

const BenefitCard = ({ feature }) => {
  return (
    <div
      key={feature.id}
      className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden"
    >
      {/* Left Image */}
      <div className="md:w-[30%] w-full p-8 lg:p-10">
        <img
          src={feature.image}
          alt={feature.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dashed Divider */}
      <div className="hidden md:flex justify-center items-center">
        <div className="h-4/5 border-l-2 border-dashed border-gray-300 mx-4"></div>
      </div>

      {/* Right Content */}
      <div className="md:w-[70%] w-full flex items-center px-6 py-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
