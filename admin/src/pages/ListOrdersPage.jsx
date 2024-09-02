import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import toast from "react-hot-toast";

function ListOrdersPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: apiClient.getAllOrdersDetails,
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: apiClient.updateOrderStatus,
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => toast.error("Failed to update status"),
  });

  const handleChangeStatusProduct = (id) => {
    updateStatus(id);
  };

  if (!data) return;

  return (
    <div className="relative mx-auto py-24 md:px-20 px-5">
      <h1 className="font-bold text-5xl mb-5">Table Orders</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-fit border-2 border-black custom-box-shadow">
        <table className="w-full lg:w-[700px] xl:w-[950px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Products Id
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                totalPrice
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((detail) => (
              <tr key={detail._id} className="bg-white border-b-2 border-black">
                <td className="w-36 h-36 p-2">
                  <h4>{detail.product}</h4>
                </td>
                <td className="px-6 py-4 text-md font-bold">{detail.email}</td>
                <td className="px-6 py-4 text-md font-bold">
                  {detail.totalPrice}
                </td>

                <td className="px-6 py-4 font-bold">
                  <div className="flex gap-4 items-center">
                    <h5>{detail.status}</h5>
                    {detail.status !== "dikirim" && (
                      <button
                        className="text-blue-400"
                        onClick={() => handleChangeStatusProduct(detail._id)}
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ListOrdersPage;
