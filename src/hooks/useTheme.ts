import { useEffect, useState } from "react";

type Theme = "" | "dark" | "light";
const useTheme = (): Theme => {
  const [themeValue, setThemeValue] = useState<Theme>("");

  useEffect(() => {
    setThemeValue(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  return themeValue;
};

export default useTheme;
