import Chip from "components/Chip";
import { CurrencyDisplay } from "components/CurrencyDisplay";
import Icon from "components/icon/Icon";
import { ImageComponent } from "components/image-component/ImageComponent";
import dayjs from "dayjs";
import { Product } from "types/product.types";
import { getSizeFromOptions } from "utils/helpers";
import { productStatusMapper } from "utils/mappers";
import { getProductStatusColor } from "utils/statusColors";

const MyItemCard: React.FC<Product> = (props) => {
  const {
    skuId,
    photos,
    sellingPrice,
    createdDate,
    name,
    options,
    productStatus,
  } = props;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <ImageComponent
          src={photos?.[0]}
          width={48}
          height={60}
          alt={name + "-my-items-alt"}
          className="rounded"
        />
        <div>
          <h6 className="tracking font-medium">#{skuId}</h6>
          <Chip
            color={getProductStatusColor(productStatus)}
            label={productStatusMapper[productStatus]}
          />
        </div>
      </div>
      <h6 className="two-lines-ellipsis my-3 font-medium">{name}</h6>
      <div className="my-3 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-400">Price</span>

          <h6 className="text-sm font-semibold">
            <CurrencyDisplay amount={sellingPrice} />
          </h6>
        </div>
        <div className="h-3 w-px bg-neutral-300"></div>
        <div className="flex items-center gap-1.5">
          <h6 className="text-neutral-400">Size:</h6>

          <h6 className="text-sm font-semibold">
            {getSizeFromOptions(options)}
          </h6>
        </div>
      </div>
      <h6 className="flex items-center gap-2 font-medium text-neutral-400">
        <Icon
          name="calendar"
          size={18}
          className="stroke-[1.6px]"
          color="var(--neutral-400)"
        />{" "}
        {dayjs(createdDate).format("DD MMM YY") || ""} -{" "}
        {dayjs(createdDate).format("hh:mm A") || ""}
      </h6>
    </div>
  );
};

export default MyItemCard;
