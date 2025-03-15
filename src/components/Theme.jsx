import React, { useContext } from "react";
import { FaMoon, FaSun, FaCheck } from "react-icons/fa6";
import Button from "./Button";
import { AppContext } from "../App";

const ACCENT_COLORS = [
  { light: "#0969da", dark: "#58a6ff" },
  { light: "#8250df", dark: "#bc8cff" },
  { light: "#d29922", dark: "#e3b341" },
  { light: "#1f883d", dark: "#56d364" },
];

const Theme = () => {
  const [appState, setAppState] = useContext(AppContext);
  const { isDark, currentAccent } = appState;

  const handleTheme = (id) => {
    setAppState((prev) => ({ ...prev, isDark: id === "dark" }));
  };

  const handleAccentColor = (id) => {
    setAppState((prev) => ({ ...prev, currentAccent: id }));
  };

  return (
    <section className="flex flex-col md:flex-row pt-2 pb-4 mt-2 gap-4 md:justify-between border-secondaryText border-y-2">
      {/* Accent color selection */}
      <section className="flex flex-col items-stretch justify-center">
        <h2 className="text-lg md:text-xl font-bold capitalize pb-4">
          Select theme accent color:
        </h2>
        <div className="flex items-center justify-center md:justify-start gap-4">
          {ACCENT_COLORS.map((color, index) => (
            <button
              key={index}
              id={index + 1}
              onClick={() => handleAccentColor(index + 1)}
              className="border-4 rounded-full p-2 mt-1.5 size-9 md:size-10"
              style={{ borderColor: isDark ? color.dark : color.light }}
            >
              <FaCheck
                className={`size-full text-primaryText ${
                  currentAccent !== index + 1 && "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* Dark/light theme selection */}
      <section className="flex flex-col items-stretch justify-center">
        <h2 className="text-lg md:text-xl font-bold capitalize pb-4">
          Select theme:
        </h2>
        <div className="flex items-start justify-center md:justify-start gap-4">
          {[
            { label: "dark", icon: <FaMoon />, isActive: isDark },
            { label: "light", icon: <FaSun />, isActive: !isDark },
          ].map((theme, index) => (
            <Button
              key={index}
              id={theme.label}
              isActive={theme.isActive}
              handler={() => handleTheme(theme.label)}
            >
              {theme.icon}
              <span>{theme.label}</span>
            </Button>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Theme;
