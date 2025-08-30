import Icon from "components/icon/Icon";
import Link from "next/link";
import React from "react";
import QRCode from "react-qr-code";

type DPPProps = {
  link: string;
};

const DPP: React.FC<DPPProps> = (props) => {
  const { link } = props;

  return (
    <div className="flex w-full items-center justify-between gap-x-4 rounded-xl bg-blue-light p-4">
      <div
        // style={{
        //   width: "calc(100% - 140px)",
        // }}
        className="w-[calc(100%-90px)] lg:w-[calc(100%-140px)]"
      >
        <h6 className="mb-2 ml-1 font-medium">Digital product passport</h6>
        <Link
          href={link}
          target="_blank"
          className="flex items-center justify-between rounded-lg border border-neutral-100 bg-white p-3 hover:bg-blue-50/60"
        >
          <h6 className="truncate text-blue-500"> {link} </h6>
          <Icon
            name="link"
            iconType="stroke"
            className="min-w-4 stroke-[2px]"
            size={20}
          />
        </Link>
      </div>

      <QRCode
        value={link}
        className="max-h-[80px] min-h-[80px] max-w-[80px] min-w-[80px] lg:max-h-[120px] lg:min-h-[120px] lg:max-w-[120px] lg:min-w-[120px]"
      />
    </div>
  );
};

export default DPP;
