import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-accent text-black">
            <Dumbbell size={18} />
          </span>
          <span className="font-display text-xl tracking-wider">FITLOG</span>
        </div>
        <p className="text-sm text-neutral-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
