import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Card from "components/card/Card";
import Chip from "components/Chip";
import PageHeader from "components/PageHeader";
import ProductViewCard from "components/product-card/ProductViewCard";
import dayjs from "dayjs";
import { ReturnBagStatusTypes } from "enums/returnBagType.enum";
import { Product } from "types/product.types";
import { getToken } from "utils/getToken";
import { getSizeFromOptions } from "utils/helpers";
import { returnBagStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getReturnBagStatusColor } from "utils/statusColors";
import { getBagOrderDetails, getReturnBagProducts } from "./action";
import BagDetailsTracker from "./components/BagDetailsTracker";
import ConfirmBagReturnButton from "./components/ConfirmBagReturnButton";
import Link from "next/link";
import { Button } from "components/Button";

const MyDKCBagDetails = async (props) => {
  const { id } = props?.params;
  const token = getToken();

  const { createdDate, orderStatus, orderStatusList, skuId } =
    await getBagOrderDetails(id);

  // const bagSkuId = "BG567260";

  const bagProductsData: Product[] | null = await getReturnBagProducts(
    id || "",
  );

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader> Bag Details</PageHeader>
      <div className="mt-5 mb-10 p-4">
        <div className="flex flex-col gap-x-10 md:flex-row">
          <h5 className="font-medium"> Bag SKU ID: {skuId || "-"} </h5>
          <h6>Ordered on: {dayjs(createdDate).format("DD MMM YYYY")}</h6>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <div className="rounded-2xl bg-blue-light p-4 md:p-6 lg:p-8">
            <div className="flex w-full flex-col gap-0 md:flex-row md:gap-8 lg:gap-20">
              <div className="flex items-center gap-4">
                <h6>Delivery Status</h6>
                <Chip
                  label={returnBagStatusMapper[orderStatus || ""] || ""}
                  color={getReturnBagStatusColor(orderStatus)}
                />
              </div>
            </div>

            <div className="my-20">
              <BagDetailsTracker
                currentStatus={orderStatus || ""}
                orderStatusList={orderStatusList || ""}
              />
            </div>
          </div>

          {orderStatus === ReturnBagStatusTypes.initiated && (
            <div className="flex w-full flex-col items-center gap-2 md:flex-row">
              <Link
                href={ROUTES.ACCOUNT.VERIFY_BAG_RETURN(skuId)}
                className="w-full"
              >
                <Button size="md" fullWidth>
                  Register Bag
                </Button>
              </Link>
              <ConfirmBagReturnButton token={token || ""} id={id || ""} />
            </div>
          )}

          {bagProductsData && bagProductsData?.length > 0 && (
            <Card
              title="Products"
              subTitle="All products from your order"
              className="w-full"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bagProductsData?.map((item, index) => (
                  <div
                    className="rounded-sm border border-gray-200 p-2 md:p-4"
                    key={index}
                  >
                    <ProductViewCard
                      image={item?.photos[0]}
                      name={item?.name}
                      price={item?.sellingPrice}
                      size={getSizeFromOptions(item?.options) || ""}
                      skuId={item?.skuId}
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const breadcrumbs: BreadcrumbTypes[] = [
  {
    label: "Home",
    href: ROUTES.SHOP,
  },
  {
    label: "Account",
    href: ROUTES.ACCOUNT.ROOT,
  },
  {
    label: "My DKC Bags",
    href: ROUTES.ACCOUNT.My_DKC_BAGS,
  },
];

export default MyDKCBagDetails;
