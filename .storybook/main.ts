import path from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig, type UserConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (viteConfig: UserConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: {
          '@': path.resolve(process.cwd(), 'src'),
        },
      },
    }),
};

export default config;
