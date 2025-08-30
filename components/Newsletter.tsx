import React from "react";
import { Button } from "./Button";
import { Input } from "./Input";

type NewsletterProps = {
  title?: string;
  buttonText?: string;
  description?: string;
};

const Newsletter: React.FC<NewsletterProps> = (props) => {
  const { buttonText, description, title } = props;

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-secondary">{title || "Join Our Newsletter"}</h3>
      <p className="text-primary2 mb-8 mt-1">
        {description ||
          "Sign up to our emails for 15% off the latest pre-loved fashion."}
      </p>
      <form action="" className="w-full">
        <Input placeholder="Enter your email here" />
        <Button className="mt-8 w-full !bg-white">
          {buttonText || "Join Newsletter"}
        </Button>
      </form>
    </div>
  );
};

export default Newsletter;
