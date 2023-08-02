"use client"

import { experimental_useOptimistic as useOptimistic } from "react";
import { addProductToDatabase } from "@/actions/serverActions";
import { Product } from '@/typings'

type Props = {
  products: Product[];
}
function Products({ products }: Props) {
  const [optimisticProducts, addOptmisticProducts] = useOptimistic(products, (state, newProduct: Product) => [...state, newProduct])

 const optmisticUpdateProducts = async (e: FormData)=>{

  const product = e.get("product")?.toString();
  const price = e.get("price")?.toString();
  if (!product || !price) return;

  let newProduct = {
    product,
    price,
  }
  
  addOptmisticProducts(newProduct)
  await addProductToDatabase(newProduct)
 }

  return (
    <>
      <form
        action={optmisticUpdateProducts}
        className="flex flex-col gap-5 max-w-xl mx-auto p-5"
      >
        <input
          name="product"
          type="text"
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Enter product name"
        />
        <input
          name="price"
          type="text"
          className="border border-gray-300 p-2 rounded-md"
          placeholder="Enter product price"
        />
        <button className="border bg-blue-500 text-white p-2 rounded-md">
          Add product
        </button>
      </form>

      <h2 className="font-bold p-5">list of products</h2>
      <div className="flex flex-wrap gap-5">
        {optimisticProducts.map((product) => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>R$: {String(product.price)}</p>
            <p>{product.id}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Products