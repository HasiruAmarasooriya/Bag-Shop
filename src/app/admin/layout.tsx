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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1">Management</p>
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="text-sm text-muted">Hasi Fashion Management</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 theme-card p-4">
              <AdminNav />
            </div>
          </aside>
          <div className="lg:col-span-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
