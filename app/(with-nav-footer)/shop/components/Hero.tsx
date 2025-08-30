"use client";

import { ImageComponent } from "components/image-component/ImageComponent";
import Slider from "components/slider/Slider";
import TopBorderText from "components/TopBorderText";
import useWindowSize from "hooks/useWindowSize";
import { useMemo } from "react";

const Hero = () => {
  const { width: windowWidth } = useWindowSize();

  const slidesToShow = useMemo(
    () => (windowWidth > 768 ? 2 : 1),
    [windowWidth],
  );

  const carouselSlides = carouselData.map((item, index) => (
    <div key={index} className="fall w-full flex-col bg-neutral-50 pb-5">
      <div className="relative aspect-square w-full lg:aspect-video">
        <ImageComponent src={item.image} fill alt={`${item.title}-image`} />
        <h4 className="absolute right-0 bottom-4 left-0 text-center font-medium text-neutral-500 uppercase">
          {item.title}
        </h4>
      </div>
      <p className="mt-2.5 text-neutral-400"> {item.subTitle} </p>
      <TopBorderText href={item.link} className="mt-6">
        VIEW COLLECTION
      </TopBorderText>
    </div>
  ));

  return (
    <section className="mx-auto w-full p-4">
      <Slider
        slides={carouselSlides}
        showDots={true}
        loop={true}
        perPage={slidesToShow}
        slidesSpacing={12}
        customOptions={customOptions}
        className="mx-auto"
        draggable={true}
      />
    </section>
  );
};

const customOptions = {
  autoplay: true,
  interval: 4000,
  pauseOnHover: true,
  pauseOnFocus: true,
};

type HeroCarousel = {
  image: string;
  title: string;
  subTitle: string;
  link: string;
};

const carouselData: HeroCarousel[] = [
  {
    image: "/hero-img-1.png",
    title: "Wedding Fashion",
    subTitle: "Wedding fashion festival dressing styles",
    link: "",
  },
  {
    image: "/hero-img-2.jpg",
    title: "Casual Fashion",
    subTitle: "Casual fashion funky styles",
    link: "",
  },
  {
    image: "/hero-img-3.jpg",
    title: "Wedding Fashion",
    subTitle: "Wedding fashion festival dressing styles",
    link: "",
  },
  {
    image: "/hero-img-4.jpg",
    title: "Casual Fashion",
    subTitle: "Casual fashion funky styles",
    link: "",
  },
];

export default Hero;
