"use client";

import { Sun, Moon } from "lucide-react";
import { useGlobalContext } from "@/lib/GlobalContext";

export default function DarkModeToggle({ className = "" }: { className?: string }) {
  const { darkMode, toggleDarkMode } = useGlobalContext();

  return (
    <button
      onClick={toggleDarkMode}
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle dark mode"
      className={`relative p-2 rounded-full transition-all duration-300 group
        ${darkMode
          ? "bg-yellow-400/15 text-yellow-300 hover:bg-yellow-400/25"
          : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300"}
        ${className}`}
    >
      {/* Sun icon — shown in dark mode to switch back to light */}
      <Sun
        size={20}
        className={`absolute inset-0 m-auto transition-all duration-300
          ${darkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`}
      />
      {/* Moon icon — shown in light mode to switch to dark */}
      <Moon
        size={20}
        className={`transition-all duration-300
          ${darkMode ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      />
    </button>
  );
}
