import type { Meta, StoryObj } from '@storybook/react';
import { ChatList } from './ChatList';

const meta = {
  title: 'ChatList',
  component: ChatList,
} satisfies Meta<typeof ChatList>;

export default meta;
type T = typeof ChatList;
type Story = StoryObj<T>;

export const Default: Story = {
    args: {},
  };