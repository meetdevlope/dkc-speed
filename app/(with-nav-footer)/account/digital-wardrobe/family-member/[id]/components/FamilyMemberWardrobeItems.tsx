import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import ProductListGrid from "components/product-list/ProductListGrid";
import { getToken } from "utils/getToken";
import WardrobeProduct from "../../../components/wardrobe-items/WardrobeItem";
import MemberAddWardrobeItem from "./MemberAddWardrobeItem";
import { getMemberWardrobeItems } from "../actions";
import ShareWardrobe from "../../../components/ShareWardrobe";
import WardrobeItemsFilters from "../../../components/wardrobe-items/WardrobeItemsFilters";
import { getWardrobeCollectionList } from "../../../action";

interface FamilyMemberWardrobeItemsProps {
  memberId: string;
}

const FamilyMemberWardrobeItems: React.FC<
  FamilyMemberWardrobeItemsProps
> = async (props) => {
  const token = getToken();
  const { memberId } = props;

  const data = await getMemberWardrobeItems(token || "", memberId);
  const collectionList = await getWardrobeCollectionList(token || "", memberId);

  return (
    <div className="my-8 px-4 md:my-14 lg:my-20">
      <div className="flex items-center justify-between gap-y-2">
        <h4 className="font-semibold">WARDROBE ITEMS</h4>
        <div className="flex items-center gap-x-2">
          <ShareWardrobe
            products={data}
            token={token || ""}
            trigger={
              <Button
                size="sm"
                startIcon={<Icon name="share" />}
                startIconContainerClassName="mr-0 md:mr-2"
              >
                <span className="hidden md:block">Share Wardrobe</span>
              </Button>
            }
          />

          <MemberAddWardrobeItem token={token || ""} memberId={memberId} />
        </div>
      </div>
      <div>
        <WardrobeItemsFilters collectionList={collectionList} />

        <ProductListGrid>
          {data?.map((product, index) => (
            <WardrobeProduct key={index} hide={["familyMember"]} {...product} />
          ))}
        </ProductListGrid>
      </div>
    </div>
  );
};

export default FamilyMemberWardrobeItems;
