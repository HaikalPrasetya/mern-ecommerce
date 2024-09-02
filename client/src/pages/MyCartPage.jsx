import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import ProductsBag from "../components/mycart/ProductsBag";
import TotalPrice from "../components/mycart/TotalPrice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

function MyCartPage() {
  const queryClient = useQueryClient();
  const { user, totalPrice, setTotalPrice, setProductsId } = useAppContext();
  const { data: products, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: apiClient.getProductsInCart,
  });

  useEffect(() => {
    if (products) {
      setProductsId(products.map((product) => product._id));
      sessionStorage.setItem(
        "ids",
        products.map((product) => product._id)
      );
    }
  }, [products, setProductsId]);

  const inStock = products?.every(
    (product) => product.status !== "Out of Stock"
  );

  useEffect(() => {
    if (products || user.cart.length > 0) {
      const totalPrice = user.cart.reduce((acc, product) => {
        return acc + product.quantity * product.product.price;
      }, 0);
      sessionStorage.setItem("total", totalPrice);
      setTotalPrice(totalPrice);
    }
  }, [products, user.cart, setTotalPrice]);

  const { mutate: removeProduct } = useMutation({
    mutationFn: apiClient.removeProductFromMyCart,
    onSuccess: () => {
      toast.success("Produk di hapus dari keranjang");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["cart"] }),
        queryClient.invalidateQueries({ queryKey: ["me"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Terjadi kesalahan");
    },
  });

  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };

  if (isLoading || !products || !user) return null;

  return (
    <div className="container mx-auto px-2 py-24">
      <h1 className="font-bold text-6xl mb-5">
        My Cart{" "}
        <span className="font-normal text-2xl">({products.length}) items</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="grid grid-cols-1 gap-5">
          {products.length === 0 && (
            <h1 className="font-bold text-3xl">Keranjang Kosong</h1>
          )}
          {products.map((product) => {
            return (
              <ProductsBag
                key={product.id}
                product={product}
                user={user}
                handleRemoveProduct={handleRemoveProduct}
              />
            );
          })}
        </div>
        <TotalPrice totalPrice={totalPrice} inStock={inStock} />
      </div>
    </div>
  );
}
export default MyCartPage;
