import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useAppContext } from "../../context/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckOutForm({ detailPayment }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, productsId } = useAppContext();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    },
  });

  const { mutate: confirmationPayment, isPending } = useMutation({
    mutationFn: apiClient.handleConfirmationPayment,
    onSuccess: () => {
      toast.success("Payment Success");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => toast.error("Payment Failed"),
  });

  const onSubmit = async (data) => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(detailPayment.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent.status === "succeeded") {
      confirmationPayment({
        ...data,
        paymentIntentId: result.paymentIntent.id,
        totalPrice: detailPayment.totalCost,
        products: productsId,
      });
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl font-bold">Confirm Your Details</h1>
      <div className="grid grid-cols-2 gap-10">
        <label className="flex flex-col">
          First Name
          <input
            type="text"
            disabled
            className="bg-slate-200 rounded p-2"
            {...register("firstName")}
          />
        </label>
        <label className="flex flex-col">
          Last Name
          <input
            type="text"
            disabled
            className="bg-slate-200 rounded p-2"
            {...register("lastName")}
          />
        </label>
      </div>
      <label className="flex flex-col">
        Email
        <input
          type="email"
          disabled
          className="bg-slate-200 rounded p-2"
          {...register("email")}
        />
      </label>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: Rp. {detailPayment.totalCost}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end items-center">
        <button
          disabled={isPending}
          type="submit"
          className="bg-blue-500 p-3 rounded disabled:bg-slate-500"
        >
          Pay
        </button>
      </div>
    </form>
  );
}
export default CheckOutForm;
