import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-black/50 px-2.5 py-0.5 text-xs uppercase tracking-wide text-neutral-200"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export function Stats({ w }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-300">
      <span className="flex items-center gap-1.5"><Clock size={15} className="text-accent" />{w.duration} min</span>
      <span className="flex items-center gap-1.5"><Flame size={15} className="text-accent" />{w.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1.5"><Star size={15} className="text-accent" />{w.rating}</span>
    </div>
  );
}

export default function WorkoutCard({ w }) {
  return (
    <Link
      href={`/workouts/${w.id}`}
      className="group block overflow-hidden rounded-xl border border-line bg-panel transition hover:border-accent"
    >
      <div className="aspect-[4/3] overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.name} className="size-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-4">
        <Tags tags={w.muscleGroups} />
        <h3 className="font-display text-2xl uppercase leading-tight">{w.name}</h3>
        <p className="text-sm text-neutral-400">{w.equipment}</p>
        <Stats w={w} />
      </div>
    </Link>
  );
}
