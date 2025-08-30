import ImageCard, { ImageCardProps } from "components/card/ImageCard";
import SectionTitle from "components/SectionTitle";
import React from "react";

const HowItWorks = () => {
  return (
    <section className="my-8 md:my-12 lg:my-16">
      <SectionTitle title="How It Works" />
      <div className="my-8 mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
        {data.map((item, index) => (
          <ImageCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;

const data: ImageCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=3220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Discover",
    description:
      "Filter, browse and scroll our wardrobes,then select the piece you love.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1467043237213-65f2da53396f?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Rent",
    description:
      "Checkout knowing we have got you covered with out Fit policy and opt in Damage protection.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=3255&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Return",
    description:
      "Return your rental in its original packaging if you can, using the address listed in your account.",
  },
];
