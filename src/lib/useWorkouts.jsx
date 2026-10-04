"use client";
import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";

let cache = null;

export function useWorkouts() {
  const [state, setState] = useState({ workouts: cache || [], loading: !cache, error: null });

  useEffect(() => {
    if (cache) return;
    let live = true;
    getWorkouts()
      .then((d) => {
        cache = d;
        if (live) setState({ workouts: d, loading: false, error: null });
      })
      .catch((e) => live && setState({ workouts: [], loading: false, error: e.message }));
    return () => { live = false; };
  }, []);

  return state;
}
