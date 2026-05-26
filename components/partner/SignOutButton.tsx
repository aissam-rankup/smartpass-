"use client";

import { LogOut } from "lucide-react";

export function PartnerSignOutButton() {
  return (
    <button
      onClick={() => {
        window.location.href = "/api/auth/signout";
      }}
      className="flex items-center gap-1.5 text-muted hover:text-error"
    >
      <LogOut className="h-4 w-4" />
    </button>
  );
}
