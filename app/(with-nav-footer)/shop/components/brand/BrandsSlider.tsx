"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllBrands } from "app/(with-nav-footer)/brand/all/action";
import GreenLabel from "components/GreenLabel";
import { ImageComponent } from "components/image-component/ImageComponent";
import InfiniteMarquee, { MarqueeItem } from "components/InfiniteMarquee";
import SectionTitle from "components/SectionTitle";

const BrandsSlider = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getAllBrands(),
    queryKey: ["all-brands"],
  });

  const brandsData = data?.data;

  const brandItems: MarqueeItem[] = brandsData
    ?.slice(0, 6)
    ?.map((item, index) => ({
      id: index,
      content: <BrandItem image={item.logo} name={item.name} />,
    }));

  return (
    <section className="fall flex-col bg-gray-light py-6">
      <GreenLabel>THE MUST-HAVES</GreenLabel>
      <SectionTitle title="brands we l♥️ve" className="mt-2 mb-4" />

      <div className="mt-4 w-full">
        <InfiniteMarquee
          items={brandItems || []}
          gap={10}
          pauseOnHover={false}
        />
      </div>
    </section>
  );
};

type BrandItemProps = {
  name: string;
  image: string;
};

const BrandItem: React.FC<BrandItemProps> = (props) => (
  <div className="fall relative aspect-video w-40 overflow-hidden border border-neutral-100 bg-gray-light">
    {props.image ? (
      <ImageComponent
        src={props.image}
        fill
        objectFit="contain"
        className="m-auto max-h-16 max-w-32"
        alt={props.name + "-alt"}
      />
    ) : (
      <div className="fall h-full">
        <h6 className="truncate font-medium mix-blend-hard-light select-none">
          {props?.name}
        </h6>
      </div>
    )}
  </div>
);

export default BrandsSlider;
