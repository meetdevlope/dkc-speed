import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import CheckoutRenderer from "./components/CheckoutRenderer";

const CheckoutPage = () => {
  const token = getToken();
  const deviceId = getDeviceId();

  return <CheckoutRenderer deviceId={deviceId || ""} token={token || ""} />;
};

export default CheckoutPage;
