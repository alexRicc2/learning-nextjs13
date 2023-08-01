"use client";

import { addProductToDatabase } from "@/actions/serverActions";
import React from "react";
import { useTransition } from "react";

function AddProductButton() {
  const [isPending, startTransition] = useTransition();

  const formData = new FormData();
  formData.append("product", "macbook pro");
  formData.append("price", "34332");

  return (
    <button
      onClick={() => startTransition(() => addProductToDatabase(formData))}
      className="fixed bottom-10 right-10 border bg-green-500 text-white p-2 rounded-md w-48"
    >
      {isPending ? "adding" : "add product "}
    </button>
  );
}

export default AddProductButton;
