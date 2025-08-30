"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getFAQs } from "../action";
import Accordion, { AccordionItem } from "components/Accordion";
import { FaqwidgetModel } from "types/cms/component.types";
import { PreviewProps } from "./types";

interface FAQProps extends PreviewProps {
  widgetConfig: FaqwidgetModel;
}

const FAQ: React.FC<FAQProps> = (props) => {
  const { widgetConfig } = props;
  const { faqId, hideDescription, hideTitle } = widgetConfig;

  const { data: faqData } = useQuery({
    queryFn: () => getFAQs(faqId),
    queryKey: ["get-faqs", faqId],
  });

  const accordionData: AccordionItem[] =
    faqData?.faqList?.map((item, index) => ({
      id: index.toString(),
      title: item?.question,
      content: <div dangerouslySetInnerHTML={{ __html: item?.answer || "" }} />,
    })) || [];

  return (
    <div>
      {!hideTitle && (
        <h6 className="font-secondary font-semibold md:text-base">
          {" "}
          {faqData?.title}{" "}
        </h6>
      )}
      {!hideDescription && (
        <div
          dangerouslySetInnerHTML={{ __html: faqData?.description || "" }}
          className="mt-1 mb-4 !text-xs md:!text-sm"
        />
      )}
      <Accordion items={accordionData} />
    </div>
  );
};

export default FAQ;
