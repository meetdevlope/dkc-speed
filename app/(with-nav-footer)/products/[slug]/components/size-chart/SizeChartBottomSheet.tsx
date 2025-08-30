import Drawer from "components/Drawer";
import React from "react";
import SizeChartContent from "./SizeChartContent";

type SizeChartBottomSheetProps = {
  productSize: string;
  sizeChartId: string;
  isOpen: boolean;
  close: () => void;
};

const SizeChartBottomSheet: React.FC<SizeChartBottomSheetProps> = (props) => {
  const { close, isOpen, sizeChartId, productSize } = props;

  return (
    <Drawer isOpen={isOpen} onClose={close} direction="down">
      <SizeChartContent sizeChartId={sizeChartId} productSize={productSize} />
    </Drawer>
  );
};

export default SizeChartBottomSheet;
