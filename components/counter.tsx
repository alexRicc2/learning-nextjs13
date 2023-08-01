"use client"

import { experimental_useOptimistic as useOptimistic } from "react";
import { adjustLikes } from "@/actions/adjustLikes"

type Props = {
  likes: number;
}

export default function Counter({ likes }: Props) {

  const [optimisticLikes, addOptimisticLikes] = useOptimistic(likes, (state, amount) => state + Number(amount))
  const updateLikes = async (amount: number) => {
    addOptimisticLikes(amount)
    await adjustLikes(amount)
  }
  return (
    <div className="flex space-x-2 border p-5 mb-2">
      <h2>Normal Counter</h2>
      <button onClick={() => updateLikes(-1)}>-</button>
      <p>{optimisticLikes}</p>
      <button onClick={() => updateLikes(1)}>+</button>
    </div>
  )
}