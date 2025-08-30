"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "app/(with-nav-footer)/brand/all/action";
import { useToggle } from "hooks/useToggle";
import Link from "next/link";
import Select, { components } from "react-select";

const BrandCheckerDropdown = () => {
  const { isOpen, open, close } = useToggle();

  const queryParams = new URLSearchParams();
  queryParams.append("pageSize", "1000");

  const { data, isLoading } = useQuery({
    queryFn: () => getAllBrands(queryParams?.toString()),
    queryKey: ["all-brands"],
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    enabled: isOpen,
  });

  const brandsData = data?.data;

  const options = brandsData?.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        <div className="flex w-full items-center justify-between">
          <span>{props.data.label}</span>
          <span className="rounded bg-primary-200 px-1 py-0.5 text-[10px] font-medium text-primary-500">
            Accepted
          </span>
        </div>
      </components.Option>
    );
  };

  return (
    <div>
      <Select
        options={options}
        isSearchable
        value={null}
        onChange={() => {}}
        components={{
          Option: CustomOption,
          IndicatorSeparator: () => null,
        }}
        isLoading={isLoading}
        placeholder="Type brand name to check"
        menuIsOpen={isOpen}
        onMenuClose={close}
        onMenuOpen={open}
        noOptionsMessage={() => (
          <div>
            <h6 className="font-medium text-neutral-500">
              Brand not available
            </h6>
            <h6 className="px-4 py-3 text-center text-neutral-400">
              <Link href="#" className="underline">
                Click here
              </Link>{" "}
              to suggest one.
            </h6>
          </div>
        )}
        styles={{
          control: (base) => ({
            ...base,
            outline: 0,
            borderColor: "var(--primary-300)",
            borderRadius: 6,
            paddingBlock: "4px",
            fontSize: 14,
            background: "var(--primary-100)",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
            width: "100%",
          }),

          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected ? "var(--primary-400)" : "white",
            fontSize: 14,
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  );
};

export default BrandCheckerDropdown;
