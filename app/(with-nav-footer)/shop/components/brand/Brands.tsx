import { getAllBrands } from "app/(with-nav-footer)/brand/all/action";
import GreenLabel from "components/GreenLabel";
import SectionTitle from "components/SectionTitle";
import BrandsCard from "./BrandsCard";

const Brands = async () => {
  const allBrandsRes = await getAllBrands();
  const brandsData = allBrandsRes.data;

  return (
    <section className="fall flex-col bg-neutral-500 p-7">
      <GreenLabel>THE MUST-HAVES</GreenLabel>
      <SectionTitle title="brands we l♥️ve" className="mt-2 mb-7 text-white" />
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 md:gap-y-8 xl:grid-cols-4">
        {brandsData?.length > 0 &&
          brandsData
            ?.slice(0, 8)
            ?.map((brand, index) => (
              <BrandsCard
                className={`${index >= 6 && "hidden xl:block"} ${
                  index >= 8 && "md:hidden lg:block"
                }`}
                key={index}
                brand={brand}
              />
            ))}
      </div>
    </section>
  );
};

export default Brands;
