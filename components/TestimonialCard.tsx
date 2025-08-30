import React from "react";
import { Icons } from "./Icons";

export type TestimonialCardProps = {
  title: string;
  content: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = (props) => {
  const { content, title } = props;

  return (
    <div className="fall relative h-full flex-col gap-4 rounded-sm bg-secondary/20 px-4 py-10">
      <h3> {title} </h3>
      <h6 className="three-lines-ellipsis h-[58px text-center text-description">
        {content}
      </h6>
      <span className="absolute -top-[14px] left-5">
        <Icons.quoteMarks />
      </span>
      <span className="absolute -bottom-[12px] right-5 scale-[-1]">
        <Icons.quoteMarks />
      </span>
    </div>
  );
};

export default TestimonialCard;
