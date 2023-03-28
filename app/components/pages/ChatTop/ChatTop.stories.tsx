import type { Meta, StoryObj } from '@storybook/react';
import { ChatTop } from './ChatTop';

const meta = {
  title: 'ChatTop',
  component: ChatTop,
} satisfies Meta<typeof ChatTop>;

export default meta;
type T = typeof ChatTop;
type Story = StoryObj<T>;

export const Default: Story = {
  };