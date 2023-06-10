import type { Meta, StoryObj } from '@storybook/react';
import { ChatHeader } from './ChatHeader';

const meta = {
  title: 'ChatHeader',
  component: ChatHeader,
} satisfies Meta<typeof ChatHeader>;

export default meta;
type T = typeof ChatHeader;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    chatName: 'chatName',
  },
};
