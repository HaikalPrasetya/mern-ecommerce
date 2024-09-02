import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import ProductCard from "../components/shared/ProductCard";
import SortOptions from "../components/shared/SortOptions";
import { useState } from "react";

function WishListPage() {
  const [sortOptions, setSortOptions] = useState("");
  const query = {
    sortOptions,
  };

  const changeSortOptions = (e) => {
    setSortOptions(e.target.value);
  };

  const { data: products } = useQuery({
    queryKey: ["wishlistProducts", sortOptions],
    queryFn: () => apiClient.getWishlistProducts(query),
  });

  return (
    <div className="py-24 px-10">
      <h1 className="font-bold text-5xl">Wishlist</h1>
      <SortOptions changeSortOptions={changeSortOptions} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 mt-7">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
export default WishListPage;
