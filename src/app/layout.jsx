import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/components/PlanProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <PlanProvider>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
