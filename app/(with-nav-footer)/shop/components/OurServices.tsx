"use client";

import GreenLabel from "components/GreenLabel";
import { ImageComponent } from "components/image-component/ImageComponent";
import SectionTitle from "components/SectionTitle";
import Slider from "components/slider/Slider";
import TopBorderText from "components/TopBorderText";
import useWindowSize from "hooks/useWindowSize";
import { useMemo } from "react";

const OurServices = () => {
  const { width: windowWidth } = useWindowSize();

  const slidesToShow = useMemo(
    () => (windowWidth > 768 ? 2 : 1),
    [windowWidth],
  );

  const carouselSlides = carouselData.map((item, index) => (
    <div key={index} className="fall w-full flex-col bg-neutral-50 pb-5">
      <div className="relative aspect-video w-full">
        <ImageComponent src={item.image} fill alt={`${item.title}-image`} />
      </div>
      <h5 className="mt-4 text-center font-medium text-neutral-500 uppercase">
        {item.title}
      </h5>
      <p className="mt-2.5 text-neutral-400"> {item.subTitle} </p>
      <TopBorderText href={item.link} className="mt-6">
        DISCOVER MORE
      </TopBorderText>
    </div>
  ));

  return (
    <section className="w-full p-4">
      <div className="fall flex-col">
        <GreenLabel>OUR SERVICES</GreenLabel>
        <SectionTitle title="DKC FOR" className="mt-2 mb-7" />
      </div>
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
  interval: 2000,
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
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Your clean out starts here",
    subTitle: "Send us your pre-loved clothes. We’ll do the rest.",
    link: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1725190418555-b6c337c58bd2?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Casual Fashion",
    subTitle: "Casual fashion funky styles",
    link: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1521804569552-2d8b03be780a?q=80&w=3546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Wedding Fashion",
    subTitle: "Wedding fashion festival dressing styles",
    link: "",
  },
];

export default OurServices;
