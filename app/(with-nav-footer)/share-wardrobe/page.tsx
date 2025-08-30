import MaxWidthWrapper from "components/MaxWidthWrapper";
import ProductListGrid from "components/product-list/ProductListGrid";
import { getSharedWardrobe } from "../account/digital-wardrobe/action";
import WardrobeProduct from "../account/digital-wardrobe/components/wardrobe-items/WardrobeItem";

const ShareWardrobeScreen = async (props) => {
  const { searchParams } = props;
  const { id } = searchParams || {};

  const { inventory, userDetails } = await getSharedWardrobe(id);

  return (
    <MaxWidthWrapper className="p-4 pb-20">
      <div className="fall mt-3 mb-3 flex-col gap-y-2 md:mt-5 md:mb-5 md:gap-y-4 lg:mt-6">
        {Object.keys(userDetails || {})?.length > 0 && (
          <h1 className="my-4 text-center font-primary text-xl font-bold md:my-8 md:text-2xl lg:my-10 lg:text-3xl">
            {userDetails?.name}&apos; Wardrobe
          </h1>
        )}
      </div>
      <ProductListGrid withHeader={false}>
        {inventory?.map((product, index) => (
          <WardrobeProduct
            key={index}
            allowRedirectToProductDetails={false}
            {...product}
          />
        ))}
      </ProductListGrid>
    </MaxWidthWrapper>
  );
};

export default ShareWardrobeScreen;
