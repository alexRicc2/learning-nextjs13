import AddProductButton from '@/components/AddProductButton';
import { Product } from '@/typings';
import { addProductToDatabase } from '@/actions/serverActions';
import Counter from '@/components/counter';
import Products from '@/components/products';

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
  const products: Product[] = await res.json();
  
  const response = await fetch('https://learning-nextjs13.vercel.app/likes', {cache: 'no-cache', next: {
    tags: ['likes']
  }})
  const {likes} = await response.json()
  

  return (
    <main>
      <h1 className="text-3xl font-bold text-center">
        Testing product server function
      </h1>

    <AddProductButton/>
     
     <Products products={products}/>

      <div className='flex flex-col items-center'>
        <h2>useoptimistic counter</h2>
          <Counter likes={likes}/>
      </div>
    </main>
  );
}
