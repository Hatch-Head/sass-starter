import type { Preview } from "@storybook/react";
import { Inter } from "next/font/google";
import React from "react";
import "tailwindcss/tailwind.css";
import "../index.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const preview: Preview = {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      code: true,
    },
    options: {
      storySort: {
        order: ["Introduction", "style-guide", "*"],
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={`${inter.className} bg-primary-500 flex w-full`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
