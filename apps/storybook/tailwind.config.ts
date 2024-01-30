import tailwindConfig from "tailwind-config";
import { Config } from "tailwindcss";

const config: Config = {
    presets: [tailwindConfig],
    content: [
        './stories/**/*.stories.(js|jsx|mjs|ts|tsx)',
        '../../packages/ui/src/**/*.(js|jsx|mjs|ts|tsx)'],
};

console.log(config);
export default config;
