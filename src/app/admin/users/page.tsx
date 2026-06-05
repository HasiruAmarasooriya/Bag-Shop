"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-stone-900">Users</h1>

      <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-stone-400">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-stone-500">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-stone-500">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-stone-500">
                    Role
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-stone-500">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-stone-50">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-stone-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={user.role === "admin" ? "info" : "default"}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-stone-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
