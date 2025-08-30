import Dialog from "components/Dialog";
import React from "react";
import SizeChartContent from "./SizeChartContent";

type SizeChartDialogProps = {
  isOpen: boolean;
  close: () => void;
  sizeChartId: string;
  productSize: string;
};

const SizeChartDialog: React.FC<SizeChartDialogProps> = (props) => {
  const { close, isOpen, sizeChartId, productSize } = props;

  return (
    <Dialog isOpen={isOpen} onClose={close} title="Size Chart" size="lg">
      <SizeChartContent sizeChartId={sizeChartId} productSize={productSize} />
    </Dialog>
  );
};

export default SizeChartDialog;
