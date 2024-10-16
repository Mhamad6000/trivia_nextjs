"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Brain } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">
              TriviaWorld
            </span>
          </Link>
          <div className="flex space-x-4">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/categories" active={pathname === "/categories"}>
              Categories
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200",
        active
          ? "border-b-2 border-primary text-foreground"
          : "text-muted-foreground hover:text-foreground hover:border-b-2 hover:border-primary"
      )}
    >
      {children}
    </Link>
  );
}
