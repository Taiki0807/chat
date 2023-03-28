import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './Chat';

const meta = {
  title: 'Chat',
  component: Chat,
} satisfies Meta<typeof Chat>;

export default meta;
type T = typeof Chat;
type Story = StoryObj<T>;

export const Default: Story = {
  };