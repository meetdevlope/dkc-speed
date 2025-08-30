import { ImageComponent } from "components/image-component/ImageComponent";
import SectionTitle from "components/SectionTitle";

const WhyUseDKC = () => {
  return (
    <section className="max-w-[500px]">
      <SectionTitle title="Why use DKC" />
      <div className="mt-4 flex flex-col gap-4">
        {dumData.map((item, index) => (
          <div className="flex gap-4" key={index}>
            <div className="relative min-h-[140px] min-w-[140px] overflow-hidden rounded-sm">
              <ImageComponent
                src={item.img}
                alt={`dkc-marketing-${item.title}`}
                // width={100}
                // height={100}
                fill
              />
            </div>
            <div className="mt-3">
              <h4 className="font-primary font-bold uppercase">
                {item.title}{" "}
              </h4>
              <h6 className="text-description mt-1 text-[15px] font-light">
                {item.description}
              </h6>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const dumData = [
  {
    img: "",
    title: "Quality Assured",
    description:
      "We quality check every single item on DKC. No more surprise stains or fake brands.",
  },
  {
    img: "",
    title: "Hassle Free",
    description:
      "Your pre-loved packages come straight from our warehouse. With moneyback guarantees and 30 day returns.",
  },
  {
    img: "",
    title: "Closing the loop",
    description:
      "We make it easier to shop and resell pre-loved clothes. We partner with major brands to end fashion waste.",
  },
];

export default WhyUseDKC;
