"use server"

import {revalidateTag} from 'next/cache';

export const adjustLikes = async (amount: number) => {
  await fetch ('https://learning-nextjs13.vercel.app/likes', {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      amount
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })

  revalidateTag('likes')
}