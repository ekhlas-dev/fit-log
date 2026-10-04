import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-28 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="mt-2 font-display text-3xl uppercase">Page not found</h1>
      <p className="mt-2 text-neutral-400">That page doesn't exist or the link is broken.</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-display uppercase tracking-wider text-black">
        Back to workouts
      </Link>
    </div>
  );
}
