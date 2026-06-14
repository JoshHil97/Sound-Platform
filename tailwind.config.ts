import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        academy: {
          background: "var(--background)",
          panel: "var(--panel)",
          panelStrong: "var(--panel-strong)",
          ink: "var(--ink)",
          muted: "var(--muted)",
          line: "var(--line)",
          accent: "var(--accent)",
          accentStrong: "var(--accent-strong)",
          teal: "var(--teal)",
          green: "var(--green)",
          warning: "var(--warning)",
          danger: "var(--danger)"
        }
      },
      boxShadow: {
        glow: "var(--glow)"
      }
    }
  },
  plugins: []
};

export default config;
