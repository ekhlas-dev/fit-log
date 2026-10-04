"use client";
import { useMemo, useState } from "react";
import { ArrowDown, ChevronDown, Search } from "lucide-react";
import { useWorkouts } from "@/lib/useWorkouts";
import { HERO_IMAGE } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";

const SORT_KEYS = { duration: "duration", calories: "caloriesBurned", rating: "rating" };

export default function Home() {
  const { workouts, loading, error } = useWorkouts();
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const term = query.trim().toLowerCase();
    const filtered = workouts.filter(
      (w) =>
        !term ||
        w.name.toLowerCase().includes(term) ||
        w.muscleGroups.some((g) => g.toLowerCase().includes(term))
    );
    const key = SORT_KEYS[sortBy];
    return [...filtered].sort((a, b) => b[key] - a[key]);
  }, [workouts, query, sortBy]);

  return (
    <>
      <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-3 font-display text-sm uppercase tracking-[0.3em] text-accent">Workout Library</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-5 max-w-lg text-neutral-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-display uppercase tracking-wider text-black transition hover:brightness-110"
          >
            Browse workouts <ArrowDown size={18} />
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={workouts[0]?.image || HERO_IMAGE} alt="Athlete training" className="aspect-[4/3] size-full object-cover" />
        </div>
      </section>

      <section id="library" className="scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl uppercase">The Library</h2>
            <p className="mt-1 text-neutral-400">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="relative">
              <span className="sr-only">Search workouts</span>
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or muscle"
                className="w-52 rounded-md border border-line bg-panel py-2 pl-9 pr-3 text-sm placeholder:text-neutral-500"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-400">
              Sort By
              <span className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-md border border-line bg-panel py-2 pl-3 pr-9 text-white"
                >
                  <option value="duration">Duration</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </span>
            </label>
          </div>
        </div>

        {loading && <Loader />}
        {error && <p className="py-16 text-center text-red-400">{error}</p>}
        {!loading && !error && list.length === 0 && (
          <p className="py-16 text-center text-neutral-400">No workouts match your search.</p>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => <WorkoutCard key={w.id} w={w} />)}
        </div>
      </section>
    </>
  );
}
