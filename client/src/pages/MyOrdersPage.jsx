import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import ProductCard from "../components/myorder/ProductCard";

function MyOrdersPage() {
  const { data: orders } = useQuery({
    queryKey: ["my-orders"],
    queryFn: apiClient.getMyOrdersDetails,
  });
  if (!orders) return;

  return (
    <div className="py-16 px-16">
      <h1 className="font-semibold text-6xl">Daftar Transaksi</h1>
      <div className="grid grid-cols-1 mt-5 gap-5">
        {orders.map((order) => (
          <ProductCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
export default MyOrdersPage;
