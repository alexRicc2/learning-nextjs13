import AddProductButton from '@/components/AddProductButton';
import { Product } from '@/typings';
import { addProductToDatabase } from '@/actions/serverActions';
import Counter from '@/components/counter';

export default async function Home() {
  const res = await fetch(
    "https://64bda1242320b36433c7c958.mockapi.io/product",
    {
      cache: "no-cache",
      next: {
        tags: ['products']
      }
    }
  );
  const response = await fetch('https://learning-nextjs13.vercel.app/likes', {cache: 'no-cache', next: {
    tags: ['likes']
  }})
  const {likes} = await response.json()
  
  const products: Product[] = await res.json();

  return (
    <main>
      <h1 className="text-3xl font-bold text-center">
        Testing product server function
      </h1>

    <AddProductButton/>
      <form
        action={addProductToDatabase}
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
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>R$: {product.price}</p>
          </div>
        ))}
      </div>

      <div className='flex flex-col items-center'>
        <h2>useoptimistic counter</h2>
          <Counter likes={likes}/>
      </div>
    </main>
  );
}
