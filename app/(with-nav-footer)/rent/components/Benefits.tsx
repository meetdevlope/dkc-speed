import ImageCard, { ImageCardProps } from "components/card/ImageCard";
import SectionTitle from "components/SectionTitle";
import React from "react";

const Benefits = () => {
  return (
    <section className="my-8 md:my-12 lg:my-16">
      <SectionTitle title="Benefits" />
      <div className="mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
        {data.map((item, index) => (
          <ImageCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

const data: ImageCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1517502166878-35c93a0072f0?q=80&w=2462&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Modest Price Tag",
    description:
      "Filter, browse and scroll our wardrobes,then select the piece you love.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Fashion Freedom",
    description:
      "Checkout knowing we have got you covered with out Fit policy and opt in Damage protection.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Minimalist Footprint",
    description:
      "Return your rental in its original packaging if you can, using the address listed in your account.",
  },
];

export default Benefits;
