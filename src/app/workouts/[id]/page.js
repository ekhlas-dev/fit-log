"use client";
import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";
import { getWorkout } from "@/lib/api";
import { PLAN_CAP, usePlan } from "@/components/PlanProvider";
import { Tags } from "@/components/WorkoutCard";
import Loader from "@/components/Loader";

export default function WorkoutDetails() {
  const { id } = useParams();
  const { plan, addToPlan, saveForLater } = usePlan();
  const [w, setW] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getWorkout(id)
      .then((d) => (d ? (setW(d), setStatus("ok")) : setStatus("missing")))
      .catch(() => setStatus("error"));
  }, [id]);

  if (status === "missing") notFound();
  if (status === "loading") return <Loader label="Loading workout…" />;
  if (status === "error") return <p className="py-20 text-center text-red-400">Could not load this workout.</p>;

  const inPlan = plan.some((p) => p.id === w.id);
  const full = !inPlan && plan.length >= PLAN_CAP;
  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <div className="grid gap-10 py-10 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-line bg-black lg:sticky lg:top-24 lg:self-start">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.name} className="size-full object-cover" />
      </div>

      <div className="space-y-7">
        <div className="space-y-3">
          <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">{w.name}</h1>
          <p className="text-neutral-400">{w.description}</p>
          <Tags tags={w.muscleGroups} />
        </div>

        <dl className="divide-y divide-line rounded-xl border border-line bg-panel">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-3">
              <dt className="font-display text-sm uppercase tracking-wider text-neutral-400">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <section>
          <h2 className="mb-3 font-display text-2xl uppercase">Instructions</h2>
          <ol className="space-y-3">
            {w.instructions.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-sm font-bold text-black">{i + 1}</span>
                <span className="text-neutral-300">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(w.id)}
            disabled={full}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-display uppercase tracking-wider text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={18} /> Add to today's plan
          </button>
          <button
            onClick={() => saveForLater(w.id)}
            className="inline-flex items-center gap-2 rounded-md border border-neutral-500 px-5 py-3 font-display uppercase tracking-wider transition hover:border-accent hover:text-accent"
          >
            <Bookmark size={18} /> Save for later
          </button>
        </div>
        {full && <p className="text-sm text-neutral-400">Your plan already has {PLAN_CAP} lifts.</p>}
      </div>
    </div>
  );
}
