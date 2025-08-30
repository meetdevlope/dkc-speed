import React from "react";
import SectionTitle from "./SectionTitle";
import Icon from "./icon/Icon";

const ContactUs = () => {
  return (
    <div className="mt-5 w-full bg-neutral-500 p-4">
      <SectionTitle title="Contact Us" className="mb-7 text-neutral-200" />
      <div className="flex rounded-2xl border border-white [&>*]:w-full">
        <div className="fall size-24 flex-col gap-y-2 border-r border-r-neutral-200">
          <Icon
            name="phone"
            size={28}
            color="var(--neutral-200)"
            iconType="stroke"
          />
          <p className="text-center text-neutral-200">Phone</p>
        </div>
        <div className="fall size-24 flex-col gap-y-2 border-r border-r-neutral-200">
          <Icon name="whatsapp" size={28} color="var(--neutral-200)" />
          <p className="text-center text-neutral-200">Phone</p>
        </div>
        <div className="fall size-24 flex-col gap-y-2">
          <Icon
            name="mail"
            size={28}
            color="var(--neutral-200)"
            iconType="stroke"
          />
          <p className="text-center text-neutral-200">Email Us</p>
        </div>
      </div>
      <p className="mt-5 text-center text-neutral-300">
        Available from Monday to Friday 9am - 9pm
      </p>
    </div>
  );
};

export default ContactUs;
