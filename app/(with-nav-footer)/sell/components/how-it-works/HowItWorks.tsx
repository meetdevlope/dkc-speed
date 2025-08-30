import ImageCard, { ImageCardProps } from "components/card/ImageCard";
import SectionTitle from "components/SectionTitle";

const HowItWorks = () => {
  return (
    <section>
      <SectionTitle title="How it works" />
      <div className="my-8 mt-4 grid grid-cols-1 gap-8 md:grid-cols-3">
        {howItWorksData.map((item, index) => (
          <ImageCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

const howItWorksData: ImageCardProps[] = [
  {
    title: "Pack",
    description:
      "Pack your bags with clothes, shoes and accessories that are in great shape.",
    image:
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=3411&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Post",
    description:
      "Download your pre-paid returns label. Pick a delivery service. Send us your bag.",
    image:
      "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=3544&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Done",
    description:
      "We’ll resell or recirculate your clothes. If an item resells, you earn Thrift+ Points.",
    image:
      "https://images.unsplash.com/photo-1567016557389-5246a1940bdc?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default HowItWorks;
