"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { SingleImageUpload } from "@/components/admin/ImageUpload";
import { CATEGORY_NAMES } from "@/lib/categories";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { Trash2 } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  image: string;
  span?: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: CATEGORY_NAMES[0],
    image: "",
    span: "normal",
  });
  const [loading, setLoading] = useState(false);

  const fetchItems = () => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.image) return;
    setLoading(true);

    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ title: "", category: CATEGORY_NAMES[0], image: "", span: "normal" });
    setLoading(false);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery image?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Gallery</h1>
      <p className="text-sm text-muted">
        Upload images for the public gallery page. No external URLs — upload files only.
      </p>

      <form
        onSubmit={handleAdd}
        className="p-6 theme-card space-y-4"
      >
        <Input
          label="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border"
            >
              {CATEGORY_NAMES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Layout
            </label>
            <select
              value={form.span}
              onChange={(e) => setForm({ ...form, span: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border"
            >
              <option value="normal">Normal</option>
              <option value="tall">Tall</option>
              <option value="wide">Wide</option>
            </select>
          </div>
        </div>
        <SingleImageUpload
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
          folder="gallery"
          label="Gallery Image"
        />
        <Button type="submit" disabled={loading || !form.image}>
          {loading ? "Adding..." : "Add to Gallery"}
        </Button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="theme-card overflow-hidden"
          >
            <div className="relative aspect-square">
              <Image
                src={item.image || PLACEHOLDER_IMAGE}
                alt={item.title}
                fill
                className="object-cover"
                sizes="300px"
              />
            </div>
            <div className="p-4 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-medium text-foreground">{item.title}</h3>
                <p className="text-xs text-muted mt-1">
                  {item.category} · {item.span || "normal"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-center text-muted py-8">
          No gallery images yet. Upload your first image above.
        </p>
      )}
    </div>
  );
}
