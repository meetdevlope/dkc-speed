"use client";

// Accordion.tsx
import React, { useState, useRef, ReactNode } from "react";
import Icon from "./icon/Icon";
import { cn } from "utils/helpers";

interface AccordionItemProps {
  title: ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  noBorders?: boolean;
  contentClassname?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  noBorders = false,
  onToggle,
  contentClassname = "",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <div className={noBorders ? "" : "border-b border-neutral-100"}>
      <button
        className="flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-4 text-left transition-all duration-200 focus:outline-none"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-800">{title}</span>
        <span
          className={`transform transition-transform duration-300 ${isOpen ? "-scale-100" : "scale-100"}`}
        >
          <Icon
            name="chevron"
            iconType="stroke"
            size={20}
            color="var(--neutral-400)"
          />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen
            ? `${contentRef.current?.scrollHeight || 1000}px`
            : "0px",
        }}
      >
        <div
          ref={contentRef}
          className={cn(
            "bg-white p-3 pt-3 pl-3",
            contentClassname,
            "[&>*]:text-xs md:[&>*]:text-sm [&>div>*]:text-xs md:[&>div>*]:text-sm",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  noBorders?: boolean;
  defaultOpen?: string[];
  contentClassname?: string;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  noBorders = false,
  defaultOpen = [],
  contentClassname = "",
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full overflow-hidden">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openItems.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
          noBorders={noBorders}
          contentClassname={contentClassname || ""}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
