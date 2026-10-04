"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/components/PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const onPlan = pathname.startsWith("/my-plan");
  const links = [
    { href: "/", label: "Workout", active: !onPlan },
    { href: "/my-plan", label: "My Plan", active: onPlan },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-accent text-black">
            <Dumbbell size={18} />
          </span>
          <span className="font-display text-xl tracking-wider">FITLOG</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={l.active ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 font-display text-sm uppercase tracking-wider transition sm:text-base ${
                  l.active ? "bg-panel text-accent" : "text-neutral-400 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-black sm:text-sm"
          >
            Plan {plan.length}
          </Link>
          <Link
            href="/my-plan"
            className="rounded-full border border-neutral-500 px-3 py-1 text-xs font-bold sm:text-sm"
          >
            Saved {saved.length}
          </Link>
        </div>
      </nav>
    </header>
  );
}
