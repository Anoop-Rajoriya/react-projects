/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBackground: "var(--primary-bg)",
        complimentaryBackground: "var(--complimentary-bg)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        hoverFocusBackground: "var(--hover-bg)",
        error: "var(--error-text)",
        success: "var(--success-text)",
        errorTransparent: "var(--error-bg)",
        successTransparent: "var(--success-bg)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};
