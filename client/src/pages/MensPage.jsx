import BennerMens from "../components/menspage/BannerMens";
import SortOptions from "../components/shared/SortOptions";
import ProductCard from "../components/shared/ProductCard";
import * as apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FilterProducts from "../components/shared/FilterProducts";

function MensPage() {
  const [sortOptions, setSortOptions] = useState("");
  const [increaseCard, setIncreaseCard] = useState(false);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(200);

  const changeSizeFilter = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSizeFilter([...sizeFilter, e.target.value]);
    } else {
      setSizeFilter(sizeFilter.filter((size) => size !== e.target.value));
    }
  };

  const changeSortOptions = (e) => {
    setSortOptions(e.target.value);
  };
  const query = {
    sizes: sizeFilter,
    increaseCard,
    sortOptions,
    category: "Men",
    price: selectedPrice,
  };

  const { data: products } = useQuery({
    queryKey: ["mensProducts", query],
    queryFn: () => apiClient.getMensProducts(query),
  });

  return (
    <div className="container mx-auto pt-24 px-3 flex flex-col gap-12">
      <BennerMens />
      <div>
        <FilterProducts
          changeSizeFilter={changeSizeFilter}
          setSelectedPrice={(e) => setSelectedPrice(e)}
        />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">
          Showing {products?.data ? 1 : 0}-
          {products?.data && products?.data.length}{" "}
          <span className="font-normal">
            out of {products?.data && products?.totalDocuments} products
          </span>
        </h1>
        <SortOptions changeSortOptions={changeSortOptions} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {products?.data &&
          products?.data.map((product, num) => (
            <ProductCard key={num} product={product} />
          ))}
      </div>
      <div className="flex justify-center">
        {products?.data && products?.totalDocuments > products?.data.length && (
          <button
            className="p-2 border-2 border-black rounded font-bold shadow-lg hover:translate-x-1 hover:translate-y-1 transition-all  ease-in-out duration-200 custom-box-shadow"
            onClick={() => setIncreaseCard(true)}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
export default MensPage;
