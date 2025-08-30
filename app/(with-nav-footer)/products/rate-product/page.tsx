import { getOrderDetails } from "app/(with-nav-footer)/account/(with-max-width)/order-details/[id]/action";
import { Order } from "app/(with-nav-footer)/account/(with-max-width)/order-details/[id]/orderDetails.types";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import PageHeader from "components/PageHeader";
import { getToken } from "utils/getToken";
import RatingWrapper from "./components/RatingWrapper";

const RateProduct = async (params) => {
  const {
    searchParams: { orderId },
  } = params;

  const orderDetail: Order = await getOrderDetails(orderId);
  const { details } = orderDetail || {};
  const token = getToken();

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <PageHeader className="mb-5">Product Review</PageHeader>
        <RatingWrapper orderDetails={details} token={token || ""} />
      </div>
    </MaxWidthWrapper>
  );
};

export default RateProduct;
