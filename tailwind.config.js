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
      // animation: {
      //   loading: "loadingEffect 1.5s ease-in-out infinite",
      // },
      // keyframes: {
      //   loadingEffect: {
      //     "0%": { 
      //       // opacity: "0.5"
      //      },
      //     "50%": {
      //       // transform: " rotate(10deg)",
      //       // opacity: "1",
      //     },
      //     "100%": {
      //       // transform: " rotate(0deg)",
      //       // opacity: "0.8",
      //     },
      //   },
      // },
    },
  },
  plugins: [],
};
