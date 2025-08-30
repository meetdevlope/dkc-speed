import { Button } from "components/Button";
import Icon from "components/icon/Icon";
import ProductListGrid from "components/product-list/ProductListGrid";
import { getToken } from "utils/getToken";
import { getWardrobeCollectionList, WardrobeItem } from "../../action";
import AddWardrobeItem from "./AddWardrobeItem";
import WardrobeProduct from "./WardrobeItem";
import ShareWardrobe from "../ShareWardrobe";
import WardrobeItemsFilters from "./WardrobeItemsFilters";

interface WardrobeItemListProps {
  data: WardrobeItem[];
  title?: string;
}

const WardrobeItemList: React.FC<WardrobeItemListProps> = async (props) => {
  const { data, title } = props;
  const token = getToken();
  const collectionList = await getWardrobeCollectionList(token || "");
  console.log(collectionList, "collectionList");

  return (
    <div className="mb-20 px-4">
      <div className="flex items-center justify-between gap-y-2 md:flex-row">
        <h4 className="font-semibold uppercase">{title || "WARDROBE ITEMS"}</h4>
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
          <AddWardrobeItem token={token || ""} />
        </div>
      </div>
      <WardrobeItemsFilters collectionList={collectionList} />
      <div>
        <ProductListGrid>
          {data?.map((product, index) => (
            <WardrobeProduct key={index} {...product} />
          ))}
        </ProductListGrid>
      </div>
    </div>
  );
};

export default WardrobeItemList;
