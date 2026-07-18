"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="w-full border border-white/15 px-3 py-2 text-left text-sm text-fog/80 transition hover:border-copper hover:text-copper lg:w-auto"
    >
      Log out
    </button>
  );
}
