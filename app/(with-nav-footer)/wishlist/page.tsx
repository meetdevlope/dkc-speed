import { getDeviceIdClient } from "utils/getDeviceIdClient";
import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import TrustBadges from "../shop/components/TrustBadges";
import WishlistMain from "./components/WishlistMain";

const WishlistScreen = () => {
  const token = getToken();
  const deviceId = getDeviceId();
  const deviceIdClient = getDeviceIdClient();

  const deviceIdValue = deviceIdClient || deviceId;

  return (
    <div>
      <WishlistMain token={token || ""} deviceIdValue={deviceIdValue || ""} />
      <TrustBadges />
    </div>
  );
};

export default WishlistScreen;
