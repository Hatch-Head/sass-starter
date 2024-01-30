import variablesPlugin from "@mertasan/tailwindcss-variables";
import containerQueryPlugin from "@tailwindcss/container-queries";
import typographyPlugin from "@tailwindcss/typography";
import { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import { borderRadius, boxShadow, colors, fontFamily, fontSize } from "./figmaExport";

const config: Config = {
  content: [],
  darkMode: ["class"],
  theme: {
    colors,
    borderRadius,
    boxShadow,
    fontFamily,
    fontSize,
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    data: {
      placeholder: 'placeholder',
    },
    extend: {
      keyframes: {
        "fadeInUp": {
          from: {
            opacity: "0",
            transform: 'translateY(20px)'
          },
          to: {
            opacity: "1",
            transform: 'translateY(0)'
          }
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out"
      },
    }
  },
  plugins: [
    // formsPlugin({
    //   strategy: "base",
    // }),
    typographyPlugin,
    animatePlugin,
    containerQueryPlugin,
    variablesPlugin({
      colorVariables: true,
    }),
  ],
};

export default config;
