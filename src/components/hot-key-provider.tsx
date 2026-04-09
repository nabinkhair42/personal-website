"use client";

import { useHotkey, useHotkeySequence } from "@tanstack/react-hotkeys";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
export const HotKeyProvider = ({ children }: { children: React.ReactNode }) => {
  const { setTheme, resolvedTheme } = useTheme();

  const router = useRouter();

  // navigate to /blog
  useHotkey("B", () => {
    router.push("/blog");
  });

  // navigate to home
  useHotkey("H", () => {
    router.push("/");
  });

  // navigate to github profile
  useHotkeySequence(["G", "H"], () => {
    window.open("https://github.com/nabinkhair42", "_blank");
  });

  // email
  useHotkey("E", () => {
    window.location.href = "mailto:nabinkhair12@gmail.com";
  });

  // resume
  useHotkey("R", () => {
    window.open("https://nabinkhair.com.np/nabin_khair.pdf", "_blank");
  });

  // toggle theme
  useHotkey("D", () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  });

  return <>{children}</>;
};
