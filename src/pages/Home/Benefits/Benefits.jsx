import React from "react";

import image1 from "../../../assets/live-tracking.png";
import image2 from "../../../assets/safe-delivery.png";
import BenefitCard from "./BenefitCard";

const Benefits = () => {
  const features = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      image: image2,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      image: image1,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      image: image1,
    },
  ];
  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Our Key Features</h2>

      <div className="space-y-8">
        {features.map((feature) => (
          <BenefitCard key={feature.id} feature={feature}></BenefitCard>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
