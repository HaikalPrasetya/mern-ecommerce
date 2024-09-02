import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { formatRupiah } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

function TotalPrice({ totalPrice, inStock }) {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      const complete = user.addressDetails !== "";
      setIsProfileComplete(complete);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-3xl">Ringkasan Pesanan</h1>
      <div>
        <div className="py-3 border-b border-slate-500">
          <h2 className="text-xl">2 Produk</h2>
        </div>
        <div className="py-3 border-b border-slate-500 flex justify-between items-center">
          <h2 className="text-xl">Total Produk</h2>
          <h5 className="text-xl">{formatRupiah(totalPrice)}</h5>
        </div>
        <div className="py-3 border-b border-slate-500 flex justify-between items-center">
          <h2 className="text-xl">Pengiriman</h2>
          <h5 className="text-xl">GRATIS</h5>
        </div>
        <div className="py-3 border-b border-slate-500 flex justify-between items-center">
          <h2 className="text-xl">Total (Termasuk pajak)</h2>
          <h5 className="text-xl">{formatRupiah(totalPrice)}</h5>
        </div>
      </div>
      {inStock ? (
        isProfileComplete ? (
          <Link
            to={`/checkout`}
            className="border-2 border-black bg-black text-white py-3 font-bold text-lg custom-box-shadow-left hover:-translate-x-1 hover:translate-y-1  transition-all ease-in-out duration-200"
          >
            Bayar Sekarang
          </Link>
        ) : (
          <button className="border-2 border-black bg-black text-white py-3 font-bold text-lg custom-box-shadow-left cursor-not-allowed">
            Complete your profile first
          </button>
        )
      ) : (
        <button className="border-2 border-black bg-black text-white py-3 font-bold text-lg custom-box-shadow-left cursor-not-allowed">
          Ada barang yang habis
        </button>
      )}
    </div>
  );
}
export default TotalPrice;
