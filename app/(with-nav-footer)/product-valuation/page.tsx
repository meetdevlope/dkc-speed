import { getToken } from "utils/getToken";
import { getAllBrands } from "../brand/all/action";
import { getOptionsList } from "./action";
import ProductValuationMain from "./components/ProductValuationMain";
import Link from "next/link";
import { ROUTES } from "utils/routes";
import { Button } from "components/Button";
import { ageSizeId, conditionId } from "utils/helpers";

const ProductValuationScreen = async () => {
  const token = getToken();
  const queryParams = new URLSearchParams();
  queryParams.append("pageSize", "1000");

  if (!token) {
    return (
      <div className="p-4 md:p-8 lg:p-10">
        <LoginCard />
      </div>
    );
  }
  const optionsList = await getOptionsList(token || "");
  const brandList = await getAllBrands(queryParams?.toString());

  return (
    <div className="bg-primary-100 p-4 md:p-8 lg:p-10">
      {token ? (
        <ProductValuationMain
          token={token || ""}
          sizeList={
            optionsList?.find((e) => e?._id === ageSizeId)?.valueArr || []
          }
          conditionList={
            optionsList?.find((e) => e?._id === conditionId)?.valueArr || []
          }
          brandList={brandList?.data || []}
        />
      ) : (
        <LoginCard />
      )}
    </div>
  );
};

export default ProductValuationScreen;

const LoginCard = () => (
  <div className="mx-auto max-w-3xl rounded-xl border border-primary-200 bg-white p-2">
    <Link
      href={
        ROUTES.LOGIN +
        "?redirectTo=" +
        decodeURIComponent(ROUTES.PRODUCT_VALUATION)
      }
    >
      {" "}
      <Button size="md" fullWidth>
        Login
      </Button>{" "}
    </Link>
    <div className="mt-2 rounded-md p-2">
      <p className="text-center text-neutral-400">
        Your must be logged in to use AI Product Valuation
      </p>
    </div>
  </div>
);
