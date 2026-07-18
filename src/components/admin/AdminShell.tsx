import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminNav } from "@/components/admin/AdminNav";

export async function AdminShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  return (
    <div className="admin-shell min-h-screen text-fog">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-black/40 lg:block">
          <div className="sticky top-0 flex h-screen flex-col px-4 py-6">
            <BrandLogo
              href="/admin/dashboard"
              markClassName="h-12 w-auto"
              showText={false}
            />
            <p className="mt-4 px-1 font-[family-name:var(--font-syne)] text-sm font-bold tracking-wide text-white">
              AK Control
            </p>
            <p className="mt-1 px-1 text-xs text-steel">Admin dashboard</p>
            <div className="mt-8 flex-1">
              <AdminNav />
            </div>
            <LogoutButton />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-white/10 bg-black/30 lg:hidden">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <BrandLogo
                href="/admin/dashboard"
                markClassName="h-10 w-auto"
                showText={false}
              />
              <LogoutButton />
            </div>
            <div className="flex gap-1 overflow-x-auto px-2 pb-3">
              <AdminNav orientation="horizontal" />
            </div>
          </header>

          <main className="flex-1 px-4 py-8 sm:px-8">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-copper">
                Dashboard
              </p>
              <h1 className="mt-2 font-[family-name:var(--font-syne)] text-3xl font-bold text-white sm:text-4xl">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 max-w-2xl text-sm text-steel">{subtitle}</p>
              )}
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
