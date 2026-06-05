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
      <h1 className="text-2xl font-serif font-bold text-foreground">Users</h1>

      <div className="theme-card overflow-hidden">
        {loading ? (
          <p className="p-8 text-center text-muted">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-muted">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted">
                    Role
                  </th>
                  <th className="text-left px-6 py-3 font-medium text-muted">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t border-border">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-muted">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={user.role === "admin" ? "info" : "default"}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-muted">
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
