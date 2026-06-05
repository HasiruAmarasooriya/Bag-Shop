"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { SingleImageUpload } from "@/components/admin/ImageUpload";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);

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

  const updateCategoryImage = async (id: string, image: string) => {
    setSavingId(id);
    await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });
    setSavingId(null);
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">
        Categories
      </h1>
      <p className="text-sm text-muted">
        Upload an image for each category. These appear on the homepage and shop.
      </p>

      <form
        onSubmit={handleAdd}
        className="flex gap-3 p-6 theme-card"
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
            className="p-4 theme-card space-y-3"
          >
            <div className="relative aspect-[3/4] bg-surface-muted overflow-hidden rounded-lg">
              <Image
                src={cat.image || PLACEHOLDER_IMAGE}
                alt={cat.name}
                fill
                className="object-cover"
                sizes="250px"
              />
            </div>
            <h3 className="font-medium text-foreground">{cat.name}</h3>
            {cat.description && (
              <p className="text-sm text-muted">{cat.description}</p>
            )}
            <SingleImageUpload
              value={cat.image || ""}
              onChange={(url) => updateCategoryImage(cat._id, url)}
              folder="categories"
              label={savingId === cat._id ? "Saving..." : "Category Image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
