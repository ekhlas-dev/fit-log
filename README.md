# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse a library of lifts, lock them into today's plan, save others for later, and watch your minutes and calories add up.

**Live demo:** https://fit-log-ten-dun.vercel.app/

## Technologies Used

- **Next.js** (App Router) for routing and the UI
- **React** for components and state (Context API)
- **Tailwind CSS** for styling and responsive layout
- **lucide-react** for icons
- **next/font** (Oswald and Inter) for typography
- **FitLog REST API** for all workout data
- **localStorage** for persisting the plan and saved lists
- **Vercel** for deployment

## Key Features

1. **Workout Library** — A responsive card grid (3 columns on desktop) showing every workout with its image, muscle-group tags, equipment, duration, calories and rating, with a loading animation while data is fetched.
2. **Sort and Search** — Sort the list by Duration, Calories or Rating, and search by workout name or muscle group.
3. **Workout Details** — A two-column page with a large image, key specs, step-by-step instructions, and "Add to today's plan" and "Save for later" buttons that show toast notifications and update the navbar badges.
4. **My Plan Log** — Live Exercises, Minutes and Calories totals, Today's Plan and Saved tabs, Mark as Done, remove buttons, and a friendly empty state.
5. **Persistent State** — The plan and saved lists survive page reloads through localStorage, and today's plan is capped at five lifts.

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Set the API URL
cp .env.example .env.local

# 3. Start the dev server
npm run dev
```

Open http://localhost:3000 in your browser.

### Environment Variables

| Name | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | FitLog API endpoint for all workouts. Defaults to `https://api.abcz.workers.dev/api/fitlog`. |

## Project Structure

```
src/
├── app/
│   ├── layout.jsx          # Root layout, fonts, navbar, footer
│   ├── page.jsx            # Home: hero and workout library
│   ├── my-plan/page.jsx    # My Plan page
│   ├── workouts/[id]/      # Workout details page
│   └── not-found.jsx       # Custom 404 page
├── components/             # Navbar, Footer, WorkoutCard, Loader, PlanProvider
└── lib/                    # API helpers and data hook
```

## Deployment

The app is deployed on Vercel. Every route (for example `/my-plan` or `/workouts/1`) works on reload, and unknown routes show the custom 404 page.

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add `NEXT_PUBLIC_API_URL` under Environment Variables if you use a different API.
4. Deploy.

## Author

Built as a Next.js assignment project.
