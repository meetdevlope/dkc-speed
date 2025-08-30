"use client";

import { Icons } from "components/Icons";
import { ImageComponent } from "components/image-component/ImageComponent";
import Slider from "components/slider/Slider";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import { useMemo } from "react";

const HeroCarousel = () => {
  const { width: windowWidth } = useWindowSize();

  const slidesToShow = useMemo(
    () => (windowWidth > 768 ? 2 : 1),
    [windowWidth],
  );

  const carouselSlides = carouselData.map((item, index) => (
    <Link href={item.link} key={index} className="w-full">
      <div className="relative h-56 w-full md:h-96">
        <ImageComponent
          src={item.image}
          fill
          alt={`${item.title}-image`}
          objectFit="cover"
          // onLoad={() => {
          //   if (index === 0) setLoaded(true);
          // }}
        />
        <div className="absolute bottom-2 left-2 flex gap-3 border-b-2 border-b-black bg-white px-4 py-2 md:bottom-4 md:left-4">
          <div>
            <h4 className="text-base md:text-lg"> {item.title} </h4>
            <p> {item.subTitle} </p>
          </div>
          <span className="hidden md:block">
            <Icons.arrow />
          </span>
        </div>
      </div>
    </Link>
  ));

  // Custom Splide options
  const customOptions = {
    autoplay: true,
    interval: 2000,
    pauseOnHover: true,
    pauseOnFocus: true,
  };

  return (
    <div className="relative mt-10">
      <div className="w-full">
        <Slider
          slides={carouselSlides}
          showDots={false}
          showArrows={true}
          loop={true}
          perPage={slidesToShow}
          slidesSpacing={12}
          customOptions={customOptions}
          className="mx-auto"
          draggable={true}
        />
      </div>
    </div>
  );
};

type CarouselData = {
  image: string;
  title: string;
  subTitle: string;
  link: "/";
};

const carouselData: CarouselData[] = [
  {
    title: "Wedding Guest",
    subTitle: "Trending Pics",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1561357747-a5ebd644c2d6?q=80&w=2462&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Wedding Guest",
    subTitle: "Trending Pics",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1596382941189-f7d2f5e22727?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Wedding Guest",
    subTitle: "Trending Pics",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1538329972958-465d6d2144ed?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Wedding Guest",
    subTitle: "Trending Pics",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1541595948840-f299cdb13759?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Wedding Guest",
    subTitle: "Trending Pics",
    link: "/",
    image:
      "https://images.unsplash.com/photo-1527736947477-2790e28f3443?q=80&w=2256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default HeroCarousel;
