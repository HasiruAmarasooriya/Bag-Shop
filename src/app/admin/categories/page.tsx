"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCategories = () => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);

    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    });

    setName("");
    setLoading(false);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">
        Categories
      </h1>

      <form
        onSubmit={handleAdd}
        className="flex gap-3 p-6 bg-white rounded-2xl border border-stone-100"
      >
        <div className="flex-1">
          <Input
            placeholder="New category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading} className="self-end">
          Add
        </Button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="p-4 bg-white rounded-xl border border-stone-100"
          >
            <h3 className="font-medium text-stone-900">{cat.name}</h3>
            {cat.description && (
              <p className="text-sm text-stone-500 mt-1">{cat.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
