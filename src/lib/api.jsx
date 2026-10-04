export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const HERO_IMAGE =
  "https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740";

export async function getWorkouts() {
  if (!API_URL) throw new Error("API URL missing. Set NEXT_PUBLIC_API_URL in .env.local");
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Could not load workouts");
  return res.json();
}

// Tries the single-item endpoint (API_URL/:id) first, then falls back to the full list.
export async function getWorkout(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (res.ok) {
      const data = await res.json();
      const item = Array.isArray(data) ? data[0] : data;
      if (item && String(item.id) === String(id)) return item;
    }
  } catch {}
  const all = await getWorkouts();
  return all.find((w) => String(w.id) === String(id)) || null;
}
