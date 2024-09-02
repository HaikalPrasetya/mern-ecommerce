import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../apiClient";
import DeleteButtonTable from "../components/DeleteButtonTable";
import EditButtonTable from "../components/EditButtonTable";
import { Link } from "react-router-dom";

function ListProductsPage() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: apiClient.getAllProducts,
  });

  if (!products) return <></>;

  return (
    <div className="relative mx-auto py-24 md:px-20 px-5">
      <h1 className="font-bold text-5xl mb-5">Table</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-fit border-2 border-black custom-box-shadow">
        <table className="w-full lg:w-[700px] xl:w-[950px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Sizes
              </th>
              <th scope="col" className="px-6 py-3">
                Stock Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <>
                <tr className="bg-white border-b-2 border-black">
                  <td className="w-36 h-36 p-2">
                    <img
                      src={product.imageUrls[0]}
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  </td>
                  <td className="px-6 py-4 text-md font-bold">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-md font-bold">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-md font-bold">
                    {product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "idr",
                    })}
                  </td>
                  <td className="text-center">
                    {product.sizes.map((size) => (
                      <p key={size} className="font-bold">
                        {size}
                      </p>
                    ))}
                  </td>
                  <td className="px-6 py-4 font-bold">{product.status}</td>
                  <td className="px-6 py-8 flex items-center gap-6">
                    <DeleteButtonTable id={product._id} />
                    <Link to={`/update-product/${product._id}`}>
                      <EditButtonTable id={product._id} />
                    </Link>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListProductsPage;
