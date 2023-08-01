"use server"

import {revalidateTag} from 'next/cache';

export const adjustLikes = async (amount: number) => {
  await fetch ('http://localhost:3000/likes', {
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