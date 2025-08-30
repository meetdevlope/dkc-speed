import SectionTitle from "components/SectionTitle";
import Slider from "components/slider/Slider";
import TestimonialCard, {
  TestimonialCardProps,
} from "components/TestimonialCard";
import React from "react";

const Testimonials = () => {
  return (
    <div className="my-8">
      <SectionTitle title="Hear from DKC Prides" className="mb-8" />
      <Slider
        slides={testimonialsData.map((item, index) => (
          <TestimonialCard key={index} {...item} />
        ))}
        showDots
        perPage={3}
        autoScroll
        slidesSpacing={18}
        breakpoints={{
          400: {
            perPage: 1,
          },
          700: {
            perPage: 2,
          },
          1150: {
            perPage: 3,
          },
        }}
      />
    </div>
  );
};

export default Testimonials;

const testimonialsData: TestimonialCardProps[] = [
  {
    title: "Outstanding Experience!",
    content:
      "I couldn't be happier with my purchase! The product is exactly what I was looking for, and the customer service was exceptional. The team went above and beyond to ensure everything went smoothly. Will definitely be returning!",
  },
  {
    title: "Highly Recommend!",
    content:
      "From start to finish, this company provided top-notch service. Fast shipping, great product quality, and their support team was always available to answer questions. A great experience all around!",
  },
  {
    title: "A Game Changer!",
    content:
      "This product has truly changed my daily routine for the better. It's durable, functional, and easy to use. The team's commitment to quality is evident in every detail. Worth every penny!",
  },
  {
    title: "Impressive Customer Support!",
    content:
      "I had a minor issue with my order, but their customer support team was quick to resolve it. Friendly, professional, and efficient. I’m impressed with how well they handle everything!",
  },
  {
    title: "Will Definitely Buy Again!",
    content:
      "Excellent quality and fast delivery. The product works as advertised, and the experience was seamless from start to finish. I’ll be back for more!",
  },
  {
    title: "Five-Star Service!",
    content:
      "The entire process, from browsing the website to receiving my product, was flawless. The team has thought of everything, making sure that every detail is perfect. I couldn't ask for more!",
  },
  {
    title: "Reliable and Trustworthy!",
    content:
      "I’ve been using their products for a few months now, and I couldn’t be more pleased. Consistent quality, timely delivery, and a hassle-free experience every time. Truly a company I can trust!",
  },
  {
    title: "Exceeded My Expectations!",
    content:
      "Not only did the product arrive on time, but it was also beyond what I imagined. The quality is superb, and the company’s attention to detail shows in every aspect. Highly impressed and will definitely recommend to others!",
  },
];
