"use client";

import InfiniteMarquee, { MarqueeItem } from "components/InfiniteMarquee";
import SectionTitle from "components/SectionTitle";

const Featured = () => {
  const brandItems: MarqueeItem[] = [
    { id: "brand1", content: <BrandItem name="Nike" /> },
    { id: "brand2", content: <BrandItem name="Adidas" /> },
    { id: "brand3", content: <BrandItem name="Puma" /> },
    { id: "brand4", content: <BrandItem name="Reebok" /> },
    {
      id: "brand5",
      content: <BrandItem name="Under Armour" />,
    },
    { id: "brand6", content: <BrandItem name="New Balance" /> },
  ];

  return (
    <section>
      <div className="bg-gray-light py-6">
        <SectionTitle title="FEATURED IN" />
      </div>

      <div className="mt-4">
        <InfiniteMarquee items={brandItems} gap={10} pauseOnHover={false} />
      </div>
    </section>
  );
};

export default Featured;

const BrandItem: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-center rounded-lg bg-neutral-50 px-4 py-2">
    <span className="text-sm text-neutral-400">{name}</span>
  </div>
);
