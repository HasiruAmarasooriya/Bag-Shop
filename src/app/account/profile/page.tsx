"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      fullName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Sri Lanka",
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || {
            fullName: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
            country: "Sri Lanka",
          },
        });
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        address: form.address,
      }),
    });

    if (res.ok) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage("Failed to update profile");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-center py-12 text-stone-500">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">Profile Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        {message && (
          <div className="p-3 bg-green-50 text-green-700 text-sm rounded-xl">
            {message}
          </div>
        )}

        <div className="p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
          <h2 className="font-semibold">Personal Information</h2>
          <Input
            label="Full Name"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input label="Email" id="email" value={form.email} disabled />
          <Input
            label="Phone"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div className="p-6 bg-white rounded-2xl border border-stone-100 space-y-4">
          <h2 className="font-semibold">Default Shipping Address</h2>
          <Input
            label="Full Name"
            value={form.address.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, fullName: e.target.value },
              })
            }
          />
          <Input
            label="Address"
            value={form.address.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: { ...form.address, address: e.target.value },
              })
            }
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="City"
              value={form.address.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, city: e.target.value },
                })
              }
            />
            <Input
              label="Postal Code"
              value={form.address.postalCode}
              onChange={(e) =>
                setForm({
                  ...form,
                  address: { ...form.address, postalCode: e.target.value },
                })
              }
            />
          </div>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
