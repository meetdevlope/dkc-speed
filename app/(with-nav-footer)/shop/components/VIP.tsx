import GreenLabel from "components/GreenLabel";
import { ImageComponent } from "components/image-component/ImageComponent";
import SectionTitle from "components/SectionTitle";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Hero1 from "../../../../public/hero-img-1.png";
import Hero2 from "../../../../public/hero-img-2.jpg";
import Hero3 from "../../../../public/hero-img-3.jpg";

const VIP = () => {
  return (
    <div className="bg-neutral-500 px-4 py-8">
      <div className="fall flex-col">
        <GreenLabel>WARDROBES</GreenLabel>
        <SectionTitle title="DKC VIP" className="mt-2 mb-7 text-white" />
      </div>
      <div className="no-scrollbar flex items-center gap-6 overflow-x-scroll">
        {vipData?.map((item, index) => (
          <div key={index}>
            <div className="relative aspect-square w-32">
              <ImageComponent
                src={item.img}
                alt={item.text + "-alt-img"}
                fill
              />
            </div>
            <h6 className="mt-2 max-w-32 truncate px-1 text-center text-white">
              {item.text}
            </h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIP;

type VIP = {
  img: StaticImport;
  text: string;
};

const vipData: VIP[] = [
  {
    text: "Kurt Schoen",
    img: Hero1,
  },
  {
    img: Hero2,
    text: "Bethany Bradtke",
  },
  {
    img: Hero3,
    text: "Bradley Grady",
  },
];
