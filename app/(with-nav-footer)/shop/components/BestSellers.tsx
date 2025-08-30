import { getCollectionProducts } from "app/(with-nav-footer)/collections/[slug]/action";
import GreenLabel from "components/GreenLabel";
import SectionTitle from "components/SectionTitle";
import TopBorderText from "components/TopBorderText";
import { ImageComponent } from "components/image-component/ImageComponent";
import Link from "next/link";
import { ROUTES } from "utils/routes";

const bestSellerSlug = "best-seller";

const BestSellers = async () => {
  const { data: bestSellerProducts } =
    await getCollectionProducts(bestSellerSlug);

  return (
    <section className="p-4">
      <div className="fall flex-col">
        <GreenLabel>ALL EYES ON</GreenLabel>
        <SectionTitle title="OUR BESTSELLERS" className="mt-2 mb-7" />
      </div>
      <div className="no-scrollbar flex gap-4 overflow-x-auto md:gap-6 lg:gap-8">
        {bestSellerProducts?.map((item, index) => (
          <Link
            href={ROUTES.PRODUCTS.SLUG(item?.slug)}
            key={index}
            className="w-30 min-w-30 md:w-48 md:min-w-48 lg:w-72 lg:min-w-72"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <ImageComponent
                src={item?.photos?.[0]}
                alt={"best-seller-img-alt-" + index}
                fill
              />
            </div>
            <p className="mt-2 truncate px-1 text-center text-xs font-medium md:text-sm">
              {item?.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="fall mt-8">
        <TopBorderText
          href={ROUTES.COLLECTION.COLLECTION_PRODUCTS(bestSellerSlug)}
        >
          View all
        </TopBorderText>
      </div>
    </section>
  );
};

export default BestSellers;
