import dynamic from "next/dynamic";
import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import TrustBadges from "../shop/components/TrustBadges";
import CartMain from "./components/CartMain";
const ProductRecommendation = dynamic(
  () => import("../../(with-nav-footer)/shop/components/ProductRecommendation"),
);

const CartScreen = () => {
  const token = getToken();
  const deviceId = getDeviceId();
  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  return (
    <div>
      <CartMain deviceIdValue={deviceIdValue || ""} token={token || ""} />
      <ProductRecommendation
        deviceId={deviceIdValue || ""}
        token={token || ""}
      />
      <div className="mt-6 md:mt-10 lg:mt-14">
        <TrustBadges />
      </div>
    </div>
  );
};

export default CartScreen;
