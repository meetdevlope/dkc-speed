import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Chip from "components/Chip";
import Divider from "components/Divider";
import PageHeader from "components/PageHeader";
import ProductDisplay from "components/product-display/ProductDisplay";
import dayjs from "dayjs";
import { CartTypeEnum } from "enums/cartType.enum";
import Link from "next/link";
import { CartResponse, ProductCart } from "types/cart.types";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { jsonParser } from "utils/helpers";
import { PreOrderStatusLabels } from "utils/mappers";
import { ROUTES } from "utils/routes";
import {
  getPreOrderSkuStatusColor,
  getPreOrderStatusColor,
} from "utils/statusColors";
import { OrderStatusList } from "../../my-dkc-bag-details/[id]/action";
import { getMyPreOrderDetails, getPreOrderSku } from "../action";
import PreOrderTracker from "./components/PreOrderTracker";

const PreOrderDetailsScreen = async (props) => {
  const { params } = props;
  const { id } = params || {};
  const token = getToken();

  const preOrderDetails = await getMyPreOrderDetails(token || "", id);

  const {
    preOrderId,
    orderStatus,
    createdDate,
    orderStatusList,
    orderRef,
    cart: orderCart,
  } = preOrderDetails;

  const preOrderSku = await getPreOrderSku(token || "", preOrderId);

  const orderStatusListParsed: OrderStatusList[] =
    jsonParser(orderStatusList) || {};

  const cart: CartResponse[] = jsonParser(orderCart) || {};

  const deviceId = getDeviceId();
  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  return (
    <div className="pb-16">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>Pre-Order Details</PageHeader>
      <div className="mb-5">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h5 className="mb-1 font-medium">Order ID: {preOrderId || "-"}</h5>
            <Chip
              color={getPreOrderStatusColor(orderStatus)}
              label={PreOrderStatusLabels[orderStatus] || ""}
            />
          </div>
          <h6>Ordered on: {dayjs(createdDate).format("DD MMM YYYY")}</h6>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-4 px-2 md:items-start lg:flex-row">
        <div className="flex w-full flex-col gap-2">
          <div className="w-full rounded-xl bg-blue-light px-2 py-4">
            <PreOrderTracker
              currentStatus={orderStatus}
              statusList={orderStatusListParsed}
            />
          </div>
          <div className="flex items-center justify-between">
            <h5 className="mt-4 font-secondary font-medium">Products</h5>
            {Array.isArray(cart) && cart?.length > 0 && (
              <h6> {cart?.length} products </h6>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {cart?.length > 0 && (
              <>
                {cart?.map((item, index) => {
                  const skuStatus = preOrderSku?.[index]?.orderStatus;
                  return (
                    <div
                      className="relative mt-2 rounded-lg border border-neutral-100 px-1"
                      key={index}
                    >
                      {item.cart.type !== CartTypeEnum.bag && (
                        <div className="rounded p-3" key={index}>
                          <ProductDisplay
                            token={token || ""}
                            deviceId={deviceIdValue || ""}
                            cartData={item}
                            viewOnly
                            showViewRentDetailsButton={
                              (item.details as ProductCart).forRent
                            }
                            orderReferenceId={orderRef || ""}
                          />
                          {cart?.length !== index + 1 && (
                            <Divider className="mt-4" />
                          )}
                          <Chip
                            className="absolute -top-3 right-2"
                            color={getPreOrderSkuStatusColor(skuStatus)}
                            label={PreOrderStatusLabels[skuStatus] || ""}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <Link
            href={ROUTES.ACCOUNT.ORDER_DETAILS(orderRef)}
            className="w-full rounded-lg bg-blue-light p-4 text-center font-medium text-primary-500 underline"
          >
            View order details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PreOrderDetailsScreen;

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
    label: "My Pre-Orders",
    href: ROUTES.ACCOUNT.MY_PRE_ORDERS.ROOT,
  },
  {
    label: "Pre-Order Details",
    href: "",
  },
];
