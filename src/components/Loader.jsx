export default function Loader({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center gap-4 py-20" role="status">
      <div className="size-10 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="font-display uppercase tracking-widest text-neutral-400">{label}</p>
    </div>
  );
}
