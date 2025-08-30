import { getProductDetails } from "app/(with-nav-footer)/products/[slug]/action";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Chip from "components/Chip";
import PageHeader from "components/PageHeader";
import ProductViewCard from "components/product-card/ProductViewCard";
import dayjs from "dayjs";
import { RentOrderStatusTypes } from "enums/rentOrderStatusTypes";
import { getToken } from "utils/getToken";
import { rentOrderStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getReturnOrderStatusColor } from "utils/statusColors";
import { getRentDetails } from "./action";
import ConfirmReturnButton from "./components/ConfirmReturnButton";
import ReturnOrderTracker from "./components/ReturnOrderTracker";
import ReturnRentProductButton from "./components/ReturnRentProductButton";

const RentOrderDetails = async (props) => {
  const { searchParams } = props;
  const token = getToken();

  const { details } = await getRentDetails(token || "", {
    rentOrderId: searchParams?.rentOrderId,
    orderReferenceId: searchParams?.orderReferenceId,
    skuId: searchParams?.skuId,
  });

  const {
    createdDate,
    orderStatus,
    orderStatusList,
    skuId,
    finalPayment,
    rentEndDate,
    rentStartDate,
    orderRef,
    _id,
  } = details;

  const productDetails = await getProductDetails(token || "", skuId);

  const showRentReturnButton = true;
  // const showRentReturnButton = dayjs().isAfter(dayjs(rentEndDate));

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>Rent Order Details</PageHeader>
      <div className="mt-5 mb-10 p-4">
        <div className="flex flex-col items-start justify-between sm:justify-normal">
          <h6 className="font-medium"> Order ID: {orderRef || "-"} </h6>
          <div className="mt-2 flex w-full items-center justify-between">
            <h6>Ordered on: {dayjs(createdDate).format("DD MMM YYYY")}</h6>
            <Chip
              label={rentOrderStatusMapper[orderStatus] || ""}
              color={getReturnOrderStatusColor(orderStatus)}
            />
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <div className="flex w-full flex-col gap-5">
            <div className="w-full rounded-xl bg-blue-light px-2 py-4">
              <ReturnOrderTracker
                orderStatusList={orderStatusList}
                currentStatus={orderStatus}
              />
            </div>
          </div>
          <div>
            <h6 className="mt-4 font-medium">Products</h6>
            <div className="mt-2 max-w-lg rounded-lg border border-neutral-100 p-2">
              <ProductViewCard
                image={productDetails?.photos?.[0]}
                name={productDetails?.name}
                price={finalPayment}
                rentStartDate={new Date(rentStartDate)}
                rentEndDate={new Date(rentEndDate)}
                forRent
                skuId={productDetails?.skuId}
              />
              {showRentReturnButton &&
                orderStatus === RentOrderStatusTypes.delivered && (
                  <ReturnRentProductButton token={token || ""} id={_id} />
                )}
              {orderStatus === RentOrderStatusTypes.return_initiated && (
                <ConfirmReturnButton token={token || ""} id={_id} />
              )}
            </div>
          </div>
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
    label: "My Rentals",
    href: ROUTES.ACCOUNT.MY_RENTALS,
  },
  {
    label: "Rent Details",
    href: "",
  },
];

export default RentOrderDetails;
