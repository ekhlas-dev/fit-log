"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { useWorkouts } from "@/lib/useWorkouts";
import { usePlan } from "@/components/PlanProvider";
import { Stats } from "@/components/WorkoutCard";
import Loader from "@/components/Loader";

export default function MyPlan() {
  const { workouts, loading } = useWorkouts();
  const { plan, saved, ready, removeFromPlan, removeSaved, markDone } = usePlan();
  const [tab, setTab] = useState("plan");

  const byId = (id) => workouts.find((w) => w.id === id);
  const planItems = plan.map((p) => ({ ...p, w: byId(p.id) })).filter((p) => p.w);
  const savedItems = saved.map((id) => ({ id, w: byId(id) })).filter((s) => s.w);
  const items = tab === "plan" ? planItems : savedItems;

  const totals = {
    Exercises: planItems.length,
    Minutes: planItems.reduce((s, p) => s + p.w.duration, 0),
    Calories: planItems.reduce((s, p) => s + p.w.caloriesBurned, 0),
  };

  return (
    <div className="py-10">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-neutral-400">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
        {Object.entries(totals).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-line bg-panel p-4">
            <p className="font-display text-3xl text-accent sm:text-5xl">{value}</p>
            <p className="text-xs uppercase tracking-wider text-neutral-400 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2" role="tablist">
        {[["plan", `Today's Plan (${plan.length})`], ["saved", `Saved (${saved.length})`]].map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-md px-4 py-2 font-display uppercase tracking-wider transition ${
              tab === key ? "bg-accent text-black" : "border border-line text-neutral-300 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {(loading || !ready) && <Loader />}

        {!loading && ready && items.length === 0 && (
          <div className="rounded-xl border border-dashed border-line py-16 text-center">
            <h2 className="font-display text-3xl uppercase">Nothing here yet</h2>
            <p className="mt-2 text-neutral-400">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-display uppercase tracking-wider text-black">
              Go to workouts
            </Link>
          </div>
        )}

        <ul className="space-y-4">
          {!loading && ready && items.map(({ id, w, done }) => (
            <li key={id} className={`flex flex-col gap-4 rounded-xl border border-line bg-panel p-4 sm:flex-row sm:items-center ${done ? "opacity-60" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.image} alt={w.name} className="h-32 w-full rounded-lg object-cover sm:size-24" />
              <div className="flex-1 space-y-1">
                <h3 className={`font-display text-2xl uppercase ${done ? "line-through" : ""}`}>{w.name}</h3>
                <p className="text-sm text-neutral-400">{w.equipment}</p>
                <Stats w={w} />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Link href={`/workouts/${w.id}`} className="rounded-md border border-neutral-500 px-3 py-2 text-sm hover:border-accent hover:text-accent">
                  View Details
                </Link>
                {tab === "plan" && (
                  <button
                    onClick={() => markDone(id)}
                    disabled={done}
                    className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-black disabled:opacity-50"
                  >
                    <Check size={16} /> {done ? "Done" : "Mark as Done"}
                  </button>
                )}
                <button
                  onClick={() => (tab === "plan" ? removeFromPlan(id) : removeSaved(id))}
                  aria-label={`Remove ${w.name}`}
                  className="grid size-9 place-items-center rounded-md border border-line hover:border-red-400 hover:text-red-400"
                >
                  <X size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
