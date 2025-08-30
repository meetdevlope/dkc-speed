import { getDeviceId } from "utils/getDKCDeviceId";
import { getToken } from "utils/getToken";
import BrandAddToCart from "./components/BrandAddToCart";
import MaxWidthWrapper from "components/MaxWidthWrapper";
import { getBrandDetails } from "../brand/[id]/action";

const PartnerBrandScreen = async (params) => {
  const { searchParams } = params || {};
  const { brandId } = searchParams || {};

  const brandDetails = await getBrandDetails(brandId || "");

  const deviceId = getDeviceId();
  const token = getToken();

  return (
    <MaxWidthWrapper>
      <div className="p-4">
        <div className="fall py-6">
          <h5>DKC X {brandDetails?.name}</h5>
        </div>
        <BrandAddToCart
          brandId={brandId}
          deviceId={deviceId || ""}
          token={token || ""}
          brandDetails={brandDetails}
          pricePerBag={brandDetails?.bagPrice}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default PartnerBrandScreen;
