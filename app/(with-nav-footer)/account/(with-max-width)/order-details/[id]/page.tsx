import { FilledStar } from "app/(with-nav-footer)/products/[slug]/components/product-review/StarRating";
import Accordion from "components/Accordion";
import Breadcrumbs, { BreadcrumbTypes } from "components/Breadcrumbs";
import Chip from "components/Chip";
import Divider from "components/Divider";
import Icon from "components/icon/Icon";
import ListItem from "components/ListItem";
import PageHeader from "components/PageHeader";
import BagCartItem from "components/product-display/BagCartItem";
import ProductDisplay from "components/product-display/ProductDisplay";
import OrderTracker from "components/tracker/OrderTracker";
import dayjs from "dayjs";
import { CartTypeEnum } from "enums/cartType.enum";
import { OrderStatusEnum } from "enums/orderStatus.enum";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BagCart, CartResponse, ProductCart } from "types/cart.types";
import AddressUtils from "utils/address";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import { jsonParser } from "utils/helpers";
import { orderStatusMapper } from "utils/mappers";
import { ROUTES } from "utils/routes";
import { getOrderStatusColor } from "utils/statusColors";
import { OrderStatusList } from "../../my-dkc-bag-details/[id]/action";
import { getOrderDetails, getReturnBagStatus } from "./action";
import { Order } from "./orderDetails.types";
import EnvironmentalFootprint from "app/(with-nav-footer)/products/[slug]/components/EnvironmentalFootprint";
import { EnvironmentalFootprintTypes } from "enums/environmentalFootprint.enum";
import { SupportedCurrency } from "types/currency";
const TrustBadges = dynamic(
  () => import("../../../../shop/components/TrustBadges"),
);

const OrderDetailsScreen = async (props) => {
  const { id } = props?.params;
  const token = getToken();
  const deviceId = getDeviceId();
  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  const orderData: Order = await getOrderDetails(id);
  const {
    bag,
    cart: orderCart,
    orderStatusList,
    orderId,
    paymentConfig: orderPaymentConfig,
    createdDate,
    orderStatus,
    finalPayment,
    billingAddress,
    shippingAddress,
    totalPayment,
    totalBags,
    skuIds,
    _id,
    currencyCountry,
    currencyRate,
  } = orderData?.details;

  const returnBagStatus: Record<string, boolean> = await getReturnBagStatus(
    token || "",
    id,
  );

  const bags = jsonParser(bag) || {};
  const cart: CartResponse[] = jsonParser(orderCart) || {};

  const orderStatusListParsed: OrderStatusList[] =
    jsonParser(orderStatusList) || {};

  const paymentConfig = jsonParser(orderPaymentConfig) || {};

  const isNotAssignedYet = skuIds?.length < totalBags;

  console.log(isNotAssignedYet, bags, "logher");

  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <PageHeader>Order Details</PageHeader>
      <div className="mb-5">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h5 className="mb-1 font-medium">Order ID: {orderId || "-"}</h5>
            <Chip
              color={getOrderStatusColor(orderStatus)}
              label={orderStatusMapper[orderStatus] || ""}
            />
          </div>
          <h6>Ordered on: {dayjs(createdDate).format("DD MMM YYYY")}</h6>
        </div>
        <div className="mt-2 flex flex-col gap-4 px-2 md:items-start lg:flex-row">
          <div className="flex w-full flex-col gap-2 lg:max-w-[70%]">
            <div className="w-full rounded-xl bg-blue-light px-2 py-4">
              <OrderTracker
                currentStatus={orderStatus}
                statusList={orderStatusListParsed}
              />
            </div>
            <div className="mt-3 rounded-lg border border-neutral-100 px-1">
              <Accordion
                items={[
                  {
                    id: "products-1",
                    title: (
                      <div className="flex items-center gap-2">
                        <Icon
                          name="shirt"
                          iconType="stroke"
                          size={20}
                          className="stroke-[1.4px]"
                        />
                        <span className="font-medium">Products</span>
                      </div>
                    ),
                    content: (
                      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                        {cart?.length > 0 && (
                          <>
                            {cart?.map((item, index) => (
                              <>
                                {item.cart.type !== CartTypeEnum.bag && (
                                  <div className="rounded md:p-3" key={index}>
                                    <ProductDisplay
                                      token={token || ""}
                                      deviceId={deviceIdValue || ""}
                                      cartData={item}
                                      viewOnly
                                      showViewRentDetailsButton={
                                        (item.details as ProductCart).forRent
                                      }
                                      orderReferenceId={orderId || ""}
                                    />
                                    {cart?.length !== index + 1 && (
                                      <Divider className="mt-4" />
                                    )}
                                  </div>
                                )}
                              </>
                            ))}
                          </>
                        )}
                        {bags &&
                          bags?.length > 0 &&
                          bags?.map((item: BagCart) => (
                            <>
                              {isNotAssignedYet &&
                                Array.from({ length: totalBags }).map(
                                  (_, idx) => (
                                    <div className="rounded md:p-3" key={idx}>
                                      <BagCartItem
                                        bagType={item.type}
                                        deviceId={deviceId || ""}
                                        id={item._id || ""}
                                        price={Number(item.price) || 0}
                                        token={token || ""}
                                        type={CartTypeEnum.bag}
                                        image={item?.image}
                                        quantity={1}
                                        viewOnly
                                        brandId={item.brandId}
                                        skuId={`DKC Bag - ${idx + 1}`}
                                        enableReturn={false}
                                      />
                                      {totalBags !== idx + 1 && (
                                        <Divider className="mt-4" />
                                      )}
                                    </div>
                                  ),
                                )}
                              {!isNotAssignedYet &&
                                item?.skuIds &&
                                item?.skuIds?.length > 0 &&
                                item?.skuIds?.map((e, i) => {
                                  const isBagReturned =
                                    returnBagStatus[e] === false;
                                  return (
                                    <div className="rounded md:p-3" key={i}>
                                      <BagCartItem
                                        bagType={item.type}
                                        deviceId={deviceId || ""}
                                        id={item._id || ""}
                                        price={Number(item.price) || 0}
                                        token={token || ""}
                                        type={CartTypeEnum.bag}
                                        image={item?.image}
                                        quantity={1}
                                        viewOnly
                                        brandId={item.brandId}
                                        skuId={"SKU: #" + e}
                                        enableReturn={
                                          isBagReturned &&
                                          orderStatus ===
                                            OrderStatusEnum.delivered
                                        }
                                      />
                                      {item?.skuIds?.length !== i + 1 && (
                                        <Divider className="mt-4" />
                                      )}
                                    </div>
                                  );
                                })}
                            </>
                          ))}
                      </div>
                    ),
                  },
                ]}
                noBorders
              />
            </div>
            <div className="mt-2 rounded-lg border border-neutral-100 px-1">
              <Accordion
                items={[
                  {
                    id: "payments-1",
                    title: (
                      <div className="flex items-center gap-2">
                        <Icon
                          name="credit-card"
                          iconType="stroke"
                          size={22}
                          className="stroke-[1.4px]"
                        />
                        <span className="font-medium">Payment</span>
                      </div>
                    ),
                    content: (
                      <div>
                        <ListItem
                          label={"Sub Total"}
                          value={totalPayment}
                          isCurrency
                          fixedCurrency={{
                            code: currencyCountry as SupportedCurrency,
                            rate: currencyRate,
                          }}
                        />
                        {Object.keys(paymentConfig || {}).map((key) => (
                          <ListItem
                            label={key}
                            value={paymentConfig[key]}
                            isCurrency
                            key={key}
                            fixedCurrency={{
                              code: currencyCountry as SupportedCurrency,
                              rate: currencyRate,
                            }}
                          />
                        ))}
                        <Divider className="my-4" color="off-white" />
                        <ListItem
                          isBold
                          label={"Total"}
                          isCurrency
                          value={finalPayment}
                          fixedCurrency={{
                            code: currencyCountry as SupportedCurrency,
                            rate: currencyRate,
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                noBorders
              />
            </div>

            <Link href={ROUTES.PRODUCTS.RATE_PRODUCT(_id || "")}>
              <div className="mt-2 flex items-center gap-x-2 rounded-lg border border-neutral-100 px-3 py-4">
                <FilledStar className="size-5 text-amber-500" />
                <h6 className="mr-auto font-medium">Rate Products</h6>
                <Icon
                  name="chevron"
                  size={20}
                  color="var(--neutral-400)"
                  iconType="stroke"
                  className="-rotate-90"
                />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="w-full flex-1 rounded-lg border border-neutral-100 px-1">
              <Accordion
                items={[
                  {
                    id: "address-1",
                    title: (
                      <div className="flex items-center gap-2">
                        <Icon
                          name="location"
                          iconType="stroke"
                          size={20}
                          className="stroke-[1.4px]"
                        />
                        <span className="font-medium">Address</span>
                      </div>
                    ),
                    content: (
                      <div>
                        <div className="mb-8">
                          <h6 className="font-medium text-neutral-400">
                            Shipping Address
                          </h6>
                          <h6 className="mt-2">
                            {AddressUtils.getLongAddressString(
                              jsonParser(shippingAddress),
                            ) || "-"}
                          </h6>
                        </div>
                        <div>
                          <h6 className="font-medium text-neutral-400">
                            Billing Address
                          </h6>
                          <h6 className="mt-2">
                            {AddressUtils.getLongAddressString(
                              jsonParser(billingAddress),
                            ) || "-"}{" "}
                          </h6>
                        </div>
                      </div>
                    ),
                  },
                ]}
                noBorders
              />
            </div>
            <div className="w-full flex-1 rounded-lg border border-neutral-100 px-1">
              <Accordion
                items={[
                  {
                    id: "environmental-footprint-1",
                    title: (
                      <div className="flex items-center gap-2">
                        <Icon
                          name="location"
                          iconType="stroke"
                          size={20}
                          className="stroke-[1.4px]"
                        />
                        <span className="font-medium">
                          Environmental Footprint
                        </span>
                      </div>
                    ),
                    content: (
                      <div>
                        <EnvironmentalFootprint
                          dataType={EnvironmentalFootprintTypes.ORDER}
                          id={orderId}
                          token={token || ""}
                          showOnlyBody
                        />
                      </div>
                    ),
                  },
                ]}
                noBorders
              />
            </div>
          </div>
        </div>
      </div>
      <TrustBadges />
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
    label: "Order History",
    href: ROUTES.ACCOUNT.ORDER_HISTORY,
  },
  {
    label: "Order Details",
    href: "",
  },
];

export default OrderDetailsScreen;
