import { prisma } from "@/lib/prisma";
import { updateUserRole } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, partners] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      select: { id: true, email: true, name: true, role: true, partnerId: true, createdAt: true },
    }),
    prisma.partner.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Utilisateurs ({users.length})</h1>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Rôle</th>
              <th className="px-4 py-3 text-left">Inscrit</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="px-4 py-3 font-medium">{u.email}</td>
                <td className="px-4 py-3 text-muted">{u.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={u.role === "ADMIN" ? "text-coral font-semibold" : "text-muted"}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{new Date(u.createdAt).toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3 text-right">
                  <form action={updateUserRole} className="flex items-center justify-end gap-1">
                    <input type="hidden" name="userId" value={u.id} />
                    <select name="role" defaultValue={u.role} className="h-7 rounded border border-border bg-white px-1 text-xs">
                      <option value="TOURIST">TOURIST</option>
                      <option value="PARTNER">PARTNER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <select name="partnerId" defaultValue={u.partnerId ?? ""} className="h-7 max-w-[100px] rounded border border-border bg-white px-1 text-xs">
                      <option value="">—</option>
                      {partners.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                    <button className="h-7 rounded bg-coral px-2 text-xs text-white">OK</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
