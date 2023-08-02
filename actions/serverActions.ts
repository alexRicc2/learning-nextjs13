"use server"
import { Product } from "@/typings";
import { revalidateTag } from "next/cache";
export const addProductToDatabase = async (productToadd: Product) => {
     
    await fetch('https://64bda1242320b36433c7c958.mockapi.io/product', {
      method: 'POST',
      body: JSON.stringify(productToadd),
      headers: {
        'Content-Type':'application/json'
      }
    })
    revalidateTag('products')
  };