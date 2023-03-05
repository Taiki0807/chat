import { addDecorator } from '@storybook/react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import {
  initialize,
  mswDecorator,
} from 'msw-storybook-addon';

addDecorator((Story) => (
  <MemoryRouterProvider>
    <Story />
  </MemoryRouterProvider>
));
initialize();

export const decorators = [mswDecorator];
export const parameters = {
  nextjs: {
    appDirectory: true,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
