"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

// Hilfsfunktion zum Lesen von Cookies (name ist ein String)
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// Hilfsfunktion zum Setzen von Cookies (name, value sind Strings und days ist eine Zahl)
function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Bei Komponentenmontage Cookie und Systempräferenz prüfen
  useEffect(() => {
    const cookiePreference = getCookie("darkMode");
    if (cookiePreference) {
      setDarkMode(cookiePreference === "true");
    } else {
      // Systempräferenz für Dark Mode prüfen
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(systemPrefersDark);
    }
  }, []);

  // Dark Mode Zustand speichern und anwenden
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Cookie speichern
    setCookie("darkMode", darkMode.toString(), 30); // Speichert für 30 Tage
  }, [darkMode]);

  return (
    <button
      className="hover:bg-gray-lighter group  text-gray-darkest dark:hover:bg-gray-darker dark:text-gray-lightest  rounded-full h-full aspect-square p-4"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <Sun strokeWidth={1.5} className="group-hover:fill-gray-lightest" />
      ) : (
        <Moon strokeWidth={1.5} className="group-hover:fill-gray-darkest" />
      )}
    </button>
  );
}
