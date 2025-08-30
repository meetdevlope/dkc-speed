import { getAllCategories } from "app/(with-nav-footer)/category/all/action";
import { ImageComponent } from "components/image-component/ImageComponent";
import SectionTitle from "components/SectionTitle";
import TopBorderText from "components/TopBorderText";
import Link from "next/link";
import { ROUTES } from "utils/routes";

const Categories = async () => {
  const allCategoriesRes = await getAllCategories();

  return (
    <section className="p-4">
      <SectionTitle title="SHOP BY CATEGORY" />
      <div className="mt-8 grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {allCategoriesRes?.data?.map((item, index) => {
          if (!item.active) return null;
          return (
            <Link
              key={index}
              href={ROUTES.CATEGORY.CATEGORY_PRODUCTS(
                allCategoriesRes?.data?.[index]?._id || "",
              )}
              className={`${index >= 6 && "hidden md:block"} ${
                index >= 8 && "md:hidden lg:block"
              }`}
            >
              <div className="bg-off-white relative aspect-square rounded-lg">
                <ImageComponent
                  src={item?.imageUrl}
                  alt={`${item.name}-img`}
                  fill
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
                <div className="absolute right-0 -bottom-2 left-0 mx-auto w-fit rounded bg-white px-1 py-0.5 shadow">
                  <p className="text-center text-xs font-medium md:text-sm">
                    {item?.name || ""}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="fall mt-12">
        <TopBorderText href={ROUTES.CATEGORY.ROOT}>
          View all categories
        </TopBorderText>
      </div>
    </section>
  );
};

export default Categories;
