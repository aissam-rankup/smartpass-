"use client";

import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/api/auth/signout";
      }}
      className="flex items-center gap-2 text-sm text-sand/60 hover:text-error"
    >
      <LogOut className="h-4 w-4" /> Déconnexion
    </button>
  );
}
