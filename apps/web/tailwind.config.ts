import tailwindConfig from "tailwind-config";
import { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindConfig],
  content: ["./app/**/*.tsx", "./modules/**/*.tsx", "../../packages/ui/src/**/*.(js|jsx|mjs|ts|tsx)"],
};

export default config;
