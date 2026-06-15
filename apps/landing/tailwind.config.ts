import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#fbfaf7",
        ink: "#171717",
        muted: "#70706a",
        line: "#e4e0d7",
        wash: "#f2eee6",
      },
      boxShadow: {
        soft: "0 24px 80px -48px rgba(23, 23, 23, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
