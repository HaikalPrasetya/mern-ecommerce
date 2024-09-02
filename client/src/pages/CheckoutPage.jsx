import { useAppContext } from "../context/AppContext";
import CheckOutForm from "../components/checkout/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import { useEffect, useState } from "react";

function CheckoutPage() {
  const { user, totalPrice, productsId, stripePromises } = useAppContext();
  const [detailPayment, setDetailPayment] = useState({});

  const query = {
    productsId,
    totalPrice,
  };

  const { mutate: createPaymentIntent } = useMutation({
    mutationFn: () => apiClient.handlePaymentIntent(query),
    enabled: !!user && !!productsId && !!totalPrice,
    onSuccess: (data) => {
      setDetailPayment(data);
    },
  });

  useEffect(() => {
    if (!user || !productsId || !totalPrice) {
      return;
    } else {
      createPaymentIntent();
    }
  }, [user, productsId, totalPrice, createPaymentIntent]);

  const options = {
    clientSecret: detailPayment?.clientSecret,
  };

  return (
    <div className="py-16">
      <div className="grid grid-cols-1 p-10">
        {detailPayment?.clientSecret && (
          <Elements stripe={stripePromises} options={options}>
            <CheckOutForm detailPayment={detailPayment} />
          </Elements>
        )}
      </div>
    </div>
  );
}
export default CheckoutPage;
