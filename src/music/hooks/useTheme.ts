import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "music-funnel-theme";

export function useMusicTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "dark";
    setTheme(stored);
    const el = document.querySelector("[data-music-theme]");
    if (el) el.setAttribute("data-theme", stored);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      const el = document.querySelector("[data-music-theme]");
      if (el) el.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}

// Backwards compat alias for existing import sites
export const useTheme = useMusicTheme;
