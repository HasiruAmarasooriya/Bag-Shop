import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/account");

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-stone-900">
            Admin Panel
          </h1>
          <p className="text-sm text-stone-500">Hasi Fashion Management</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 p-4 bg-white rounded-2xl border border-stone-100">
              <AdminNav />
            </div>
          </aside>
          <div className="lg:col-span-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
