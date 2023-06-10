import type { Meta, StoryObj } from '@storybook/react';
import { ChatInput } from './ChatInput';

const meta = {
  title: 'ChatInput',
  component: ChatInput,
} satisfies Meta<typeof ChatInput>;

export default meta;
type T = typeof ChatInput;
type Story = StoryObj<T>;

export const Default: Story = {
  args: {
    text: 'chat input',
  },
};
