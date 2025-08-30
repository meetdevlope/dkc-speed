import ProductSkeleton from "components/product-card/ProductSkeleton";

const ProductListSkeleton = ({ number = 10 }: { number?: number }) => {
  return (
    <div className="product-list-grid grid grid-cols-2 gap-x-2 gap-y-10 transition-all duration-500 max-[400px]:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array(number || 10)
        .fill(null)
        .map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
    </div>
  );
};

export default ProductListSkeleton;
