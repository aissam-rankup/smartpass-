import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Role } from "@/lib/enums";
import { updateUserRole } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const filterRole =
    searchParams.role && Object.values(Role).includes(searchParams.role as Role)
      ? (searchParams.role as Role)
      : undefined;

  const [users, partners] = await Promise.all([
    prisma.user.findMany({
      where: filterRole ? { role: filterRole } : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        subscription: { select: { status: true } },
        partner: { select: { name: true } },
      },
    }),
    prisma.partner.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold">Utilisateurs</h1>
      <p className="mt-1 text-sm text-muted">{users.length} utilisateur(s) affichés</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <RoleChip current={filterRole} value={undefined} label="Tous" />
        {Object.values(Role).map((r) => (
          <RoleChip key={r} current={filterRole} value={r} label={r} />
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-stone text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Rôle</th>
              <th className="px-4 py-3 text-left">Partenaire</th>
              <th className="px-4 py-3 text-left">Abo</th>
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
                  <Badge variant={u.role === Role.ADMIN ? "coral" : u.role === Role.PARTNER ? "teal" : "outline"}>
                    {u.role}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted">{u.partner?.name ?? "—"}</td>
                <td className="px-4 py-3">{u.subscription?.status ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{u.createdAt.toLocaleDateString("fr-FR")}</td>
                <td className="px-4 py-3 text-right">
                  <form action={updateUserRole} className="flex items-center justify-end gap-1">
                    <input type="hidden" name="userId" value={u.id} />
                    <select
                      name="role"
                      defaultValue={u.role}
                      className="h-8 rounded border border-border bg-white px-2 text-xs"
                    >
                      {Object.values(Role).map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <select
                      name="partnerId"
                      defaultValue={u.partnerId ?? ""}
                      className="h-8 max-w-[110px] rounded border border-border bg-white px-2 text-xs"
                    >
                      <option value="">— partenaire —</option>
                      {partners.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <button className="h-8 rounded bg-coral px-3 text-xs font-medium text-white">
                      Save
                    </button>
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

function RoleChip({
  current,
  value,
  label,
}: {
  current?: Role;
  value?: Role;
  label: string;
}) {
  const href = value ? `?role=${value}` : "?";
  const active = current === value;
  return (
    <a
      href={href}
      className={
        "rounded-full border px-3 py-1 text-xs transition " +
        (active ? "border-coral bg-coral text-white" : "border-border bg-white text-charcoal hover:border-coral")
      }
    >
      {label}
    </a>
  );
}
