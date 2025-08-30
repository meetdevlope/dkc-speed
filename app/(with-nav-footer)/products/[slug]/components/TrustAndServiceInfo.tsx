import Icon from "components/icon/Icon";

const TrustAndServiceInfo = () => {
  return (
    <div className="my-2 px-2 py-4">
      {/* <div className="flex items-center justify-center">
        <h6 className="font-medium">See our 9,215 reviews on</h6>
        <FilledStar className="mr-1 ml-2 size-5 text-[#00DA8D]" />
        <h6 className="font-medium">Trust Pilot</h6>
      </div> */}
      <div className="mt-6 grid grid-cols-2">
        <div className="fall flex-col gap-y-3">
          <Icon name="truck" size={26} />
          <h6 className="truncate text-neutral-400">Express Delivery</h6>
        </div>
        <div className="fall flex-col gap-y-3">
          <Icon name="box" iconType="stroke" />
          <h6 className="truncate text-neutral-400">Easy Return</h6>
        </div>
      </div>
    </div>
  );
};

export default TrustAndServiceInfo;
