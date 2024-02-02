import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
    // Required
    framework: '@storybook/nextjs',
    stories: [
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
        // Packages ui
        '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',
        // Apps web
        //'../../../apps/web/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)',

    ],
    // Optional
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-designs',
        '@storybook/addon-interactions'
    ],
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../public'],
};

export default config;