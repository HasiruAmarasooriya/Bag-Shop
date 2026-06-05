"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { isLocalImage } from "@/lib/constants";
import AppImage from "@/components/ui/AppImage";
import type { UploadFolder } from "@/lib/constants";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: UploadFolder;
  maxImages?: number;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "products",
  maxImages = 5,
  label = "Product Images",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange([...value, data.url]);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const remaining = maxImages - value.length;
    if (remaining <= 0) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    for (const file of Array.from(files).slice(0, remaining)) {
      await uploadFile(file);
    }
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((url, i) => (
            <div key={url + i} className="relative aspect-square bg-surface-muted border border-border group">
              <AppImage
                src={url}
                alt={`Upload ${i + 1}`}
                fill
                className="object-cover"
                sizes="150px"
                allowExternal
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-gold text-charcoal text-[10px] uppercase tracking-wider">
                  Main
                </span>
              )}
              {!isLocalImage(url) && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-amber-500 text-white text-[10px] uppercase tracking-wider">
                  Re-upload
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {value.length < maxImages && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all",
            dragOver
              ? "border-gold bg-gold/5"
              : "border-border hover:border-gold/50 hover:bg-surface-muted",
            uploading && "pointer-events-none opacity-60"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple={maxImages > 1}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {uploading ? (
            <Loader2 className="w-8 h-8 text-gold mx-auto animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-muted mx-auto mb-3" />
              <p className="text-sm text-foreground font-medium">
                Click or drag images to upload
              </p>
              <p className="text-xs text-muted mt-1">
                PNG, JPG, WebP up to 5MB · {value.length}/{maxImages} images
              </p>
            </>
          )}
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

interface SingleImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: UploadFolder;
  label?: string;
}

export function SingleImageUpload({
  value,
  onChange,
  folder = "categories",
  label = "Image",
}: SingleImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      <div className="flex items-start gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          className="relative w-28 h-28 bg-surface-muted border border-border cursor-pointer hover:border-gold transition-colors shrink-0"
        >
          {value ? (
            <AppImage src={value} alt="Upload" fill className="object-cover" sizes="112px" allowExternal />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted">
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gold" />
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 mb-1" />
                  <span className="text-[10px]">Upload</span>
                </>
              )}
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
          />
        </div>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-500 hover:underline"
          >
            Remove image
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
