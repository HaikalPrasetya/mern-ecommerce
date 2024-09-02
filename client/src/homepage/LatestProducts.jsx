import ProductCard from "../components/shared/ProductCard";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";

function LatestsProducts() {
  const { data: products } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: apiClient.getLatestProducts,
  });

  return (
    <div className="max-w-[1500px] mx-auto">
      <h1 className="font-bold text-3xl text-center">Latests Products</h1>
      <div className="w-[200px] mx-auto h-1 bg-black rounded-full mt-2" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-6 mt-24 px-7 md:px-28">
        {products?.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
}
export default LatestsProducts;
