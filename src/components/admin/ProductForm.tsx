"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { Product } from "@/types";

interface ProductFormProps {
  product?: Product;
}

const categories = [
  "Handbags",
  "Tote Bags",
  "Crossbody",
  "Clutches",
  "Backpacks",
];

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    comparePrice: product?.comparePrice?.toString() || "",
    images: product?.images?.join("\n") || "",
    category: product?.category || categories[0],
    tags: product?.tags?.join(", ") || "",
    stock: product?.stock?.toString() || "0",
    featured: product?.featured || false,
    colors: product?.colors?.join(", ") || "",
    sizes: product?.sizes?.join(", ") || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      comparePrice: form.comparePrice
        ? parseFloat(form.comparePrice)
        : undefined,
      images: form.images.split("\n").filter(Boolean),
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      stock: parseInt(form.stock),
      featured: form.featured,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const url = product
      ? `/api/products/${product._id}`
      : "/api/products";
    const method = product ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/products");
      router.refresh();
    } else {
      alert("Failed to save product");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
        <Input
          label="Product Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Description
          </label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Price (LKR)"
            type="number"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <Input
            label="Compare Price (optional)"
            type="number"
            value={form.comparePrice}
            onChange={(e) =>
              setForm({ ...form, comparePrice: e.target.value })
            }
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">
            Image URLs (one per line)
          </label>
          <textarea
            rows={3}
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          />
        </div>
        <Input
          label="Colors (comma separated)"
          value={form.colors}
          onChange={(e) => setForm({ ...form, colors: e.target.value })}
          placeholder="Black, Rose Gold, Cream"
        />
        <Input
          label="Sizes (comma separated)"
          value={form.sizes}
          onChange={(e) => setForm({ ...form, sizes: e.target.value })}
          placeholder="Small, Medium, Large"
        />
        <Input
          label="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
            className="rounded text-rose-900"
          />
          <span className="text-sm font-medium text-stone-700">
            Featured Product
          </span>
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
