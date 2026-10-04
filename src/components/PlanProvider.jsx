"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const PlanContext = createContext(null);
export const PLAN_CAP = 5;
const KEY = "fitlog:v1";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]); // [{ id, done }]
  const [saved, setSaved] = useState([]); // [id]
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(data.plan)) setPlan(data.plan);
      if (Array.isArray(data.saved)) setSaved(data.saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ plan, saved })); } catch {}
  }, [plan, saved, ready]);

  const notify = useCallback((msg) => {
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 2400);
  }, []);

  const addToPlan = (id) => {
    if (plan.some((p) => p.id === id)) return notify("Already in today's plan");
    if (plan.length >= PLAN_CAP) return notify("Plan is full. Finish a lift first.");
    setPlan([...plan, { id, done: false }]);
    notify("Added to today's plan");
  };
  const saveForLater = (id) => {
    if (saved.includes(id)) return notify("Already saved");
    setSaved([...saved, id]);
    notify("Saved for later");
  };
  const removeFromPlan = (id) => {
    setPlan(plan.filter((p) => p.id !== id));
    notify("Removed from today's plan");
  };
  const removeSaved = (id) => {
    setSaved(saved.filter((s) => s !== id));
    notify("Removed from saved");
  };
  const markDone = (id) => {
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)));
    notify("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, ready, addToPlan, saveForLater, removeFromPlan, removeSaved, markDone }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black shadow-lg transition duration-200 ${
          toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);
