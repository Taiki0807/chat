import type { Meta, StoryObj } from '@storybook/react';
import { ChatLoading } from './ChatLoading';

const meta = {
  title: 'ChatLoading',
  component: ChatLoading,
} satisfies Meta<typeof ChatLoading>;

export default meta;
type T = typeof ChatLoading;
type Story = StoryObj<T>;

export const Default: Story = {};
