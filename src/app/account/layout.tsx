import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AccountNav from "@/components/account/AccountNav";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/account");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-28">
            <h2 className="text-lg font-semibold text-stone-900 mb-4 px-4">
              My Account
            </h2>
            <AccountNav />
          </div>
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </div>
  );
}
